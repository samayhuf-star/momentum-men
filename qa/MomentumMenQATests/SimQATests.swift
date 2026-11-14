import XCTest

final class SimQATests: XCTestCase {
  func testMomentumFlow() throws {
    let out = ProcessInfo.processInfo.environment["TEST_RUNNER_SIM_QA_OUT"] ?? "/tmp/sim-qa"
    try FileManager.default.createDirectory(atPath: out, withIntermediateDirectories: true)
    var steps: [[String: Any]] = []
    func step(_ name: String, _ ok: Bool, _ detail: String) {
      steps.append(["step": steps.count + 1, "name": name, "pass": ok, "detail": detail])
      let line = "[momentum-qa] \(ok ? "PASS" : "FAIL") \(name): \(detail)\n"
      if let data = line.data(using: .utf8) {
        let url = URL(fileURLWithPath: out).appendingPathComponent("qa.log")
        if FileManager.default.fileExists(atPath: url.path), let handle = try? FileHandle(forWritingTo: url) {
          handle.seekToEndOfFile(); handle.write(data); try? handle.close()
        } else {
          try? data.write(to: url)
        }
      }
    }
    func shot(_ name: String) {
      let image = XCUIScreen.main.screenshot()
      let url = URL(fileURLWithPath: out).appendingPathComponent("\(name).png")
      try? image.pngRepresentation.write(to: url)
    }
    func save() {
      let url = URL(fileURLWithPath: out).appendingPathComponent("results.json")
      let data = try? JSONSerialization.data(withJSONObject: ["steps": steps], options: [.prettyPrinted])
      try? data?.write(to: url)
    }

    let app = XCUIApplication()
    app.launch()

    func el(_ id: String) -> XCUIElement {
      app.descendants(matching: .any).matching(identifier: id).firstMatch
    }
    func tapId(_ id: String, timeout: TimeInterval = 6) -> Bool {
      let target = el(id)
      guard target.waitForExistence(timeout: timeout) else { return false }
      target.tap()
      return true
    }

    let guest = el("continue-as-guest")
    let home = el("home")
    if guest.waitForExistence(timeout: 15) {
      guest.tap()
      step("guest", true, "tapped Continue as Guest")
    } else {
      let inApp = home.exists
      step("guest", inApp, inApp ? "already in the app" : "neither guest screen nor home found")
    }

    let homeOk = home.waitForExistence(timeout: 10)
    step("home", homeOk, homeOk ? "home visible" : "missing testID home")
    shot("01-home")
    XCTAssertTrue(homeOk)

    let startOk = tapId("start-workout")
    step("start", startOk, startOk ? "tapped start" : "missing start-workout")

    let workout = el("workout")
    let workoutOk = workout.waitForExistence(timeout: 8)
    let detail = el("exercise-detail")
    let detailOk = detail.waitForExistence(timeout: 4)
    step("workout", workoutOk, workoutOk ? "workout visible" : "missing testID workout")
    step("exercise-detail", detailOk, detailOk ? "exercise media visible" : "missing testID exercise-detail")
    shot("02-workout")
    XCTAssertTrue(workoutOk)
    XCTAssertTrue(detailOk)

    let advanced = tapId("next-exercise", timeout: 4)
    let repsOk = tapId("mode-reps", timeout: 4)
    let repsDetail = detail.waitForExistence(timeout: 4)
    step("exercise-reps", advanced && repsOk && repsDetail, repsOk ? "reps mode on the next exercise" : "missing mode-reps")
    shot("03-exercise-detail")
    XCTAssertTrue(repsOk)

    var finished = false
    let next = el("next-exercise")
    for _ in 0..<8 {
      if app.alerts.firstMatch.exists { finished = true; break }
      if next.waitForExistence(timeout: 3) {
        next.tap()
      }
    }
    let ok = app.alerts.buttons["OK"]
    if ok.waitForExistence(timeout: 6) {
      ok.tap()
      finished = true
    }
    step("finish-workout", finished, finished ? "session saved" : "finish alert did not appear")
    _ = home.waitForExistence(timeout: 8)

    let progressOk = tapId("tab-progress")
    step("progress", progressOk, progressOk ? "progress tab" : "missing tab-progress")
    shot("04-progress")

    let generatorOk = tapId("tab-generator")
    step("generator", generatorOk, generatorOk ? "generator tab" : "missing tab-generator")
    shot("05-generator")

    _ = tapId("tab-home")
    _ = home.waitForExistence(timeout: 6)
    let payBtnOk = tapId("open-paywall")
    step("open-paywall", payBtnOk, payBtnOk ? "tapped paywall" : "missing open-paywall")
    let paywall = el("paywall")
    let payOk = paywall.waitForExistence(timeout: 8)
    step("paywall", payOk, payOk ? "paywall visible" : "missing testID paywall")
    XCTAssertTrue(payOk)

    let restore = el("restore")
    step("restore", restore.waitForExistence(timeout: 4), "Restore control")
    let yearly = el("buy-yearly")
    step("yearly-cta", yearly.waitForExistence(timeout: 4), "yearly plan loaded from StoreKit")

    save()
  }
}
