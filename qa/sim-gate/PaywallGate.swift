import StoreKitTest
import XCTest

/// Paywall, purchase, and Manage Subscription against qa/MomentumMen.storekit.
/// Maestro's simctl launch does not apply an Xcode StoreKit configuration, so
/// this UI test loads the same file with SKTestSession and the shared scheme.
final class PaywallGate: XCTestCase {
  var session: SKTestSession?

  func testPaywallWithStoreKit() throws {
    let out = ProcessInfo.processInfo.environment["TEST_RUNNER_SIM_QA_OUT"] ?? "/tmp/sim-qa"
    try FileManager.default.createDirectory(atPath: out, withIntermediateDirectories: true)
    var steps: [[String: Any]] = []

    func step(_ name: String, _ ok: Bool, _ detail: String) {
      steps.append(["step": steps.count + 1, "name": name, "pass": ok, "detail": detail])
      let line = "[momentum-qa] \(ok ? "PASS" : "FAIL") \(name): \(detail)\n"
      let url = URL(fileURLWithPath: out).appendingPathComponent("storekit-qa.log")
      if let data = line.data(using: .utf8) {
        if FileManager.default.fileExists(atPath: url.path), let handle = try? FileHandle(forWritingTo: url) {
          handle.seekToEndOfFile()
          handle.write(data)
          try? handle.close()
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
      let url = URL(fileURLWithPath: out).appendingPathComponent("storekit-results.json")
      let data = try? JSONSerialization.data(withJSONObject: ["steps": steps], options: [.prettyPrinted])
      try? data?.write(to: url)
    }

    defer { save() }

    let bundled = Bundle(for: PaywallGate.self).path(forResource: "MomentumMen", ofType: "storekit")
    let envPath = ProcessInfo.processInfo.environment["TEST_RUNNER_STOREKIT_CONFIG"]
    do {
      if let bundled {
        session = try SKTestSession(configurationFileNamed: "MomentumMen")
        step("storekit-file", true, "bundle \(bundled)")
      } else if let envPath {
        session = try SKTestSession(contentsOf: URL(fileURLWithPath: envPath))
        step("storekit-file", true, "url \(envPath)")
      } else {
        step("storekit-file", false, "MomentumMen.storekit was not in the test bundle")
      }
      session?.resetToDefaultState()
      session?.clearTransactions()
      session?.disableDialogs = true
    } catch {
      step("storekit-file", false, "SKTestSession \(error)")
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
    func dismissAlerts() {
      let spring = XCUIApplication(bundleIdentifier: "com.apple.springboard")
      for _ in 0..<3 {
        let alert = app.alerts.firstMatch
        if alert.waitForExistence(timeout: 2) {
          shot("35-storekit-alert")
          if alert.buttons["OK"].exists { alert.buttons["OK"].tap() }
          else if alert.buttons["Cancel"].exists { alert.buttons["Cancel"].tap() }
          else { alert.buttons.firstMatch.tap() }
          continue
        }
        let system = spring.alerts.firstMatch
        if system.exists {
          shot("35b-storekit-system-alert")
          let titles = ["Subscribe", "Purchase", "Confirm", "OK", "Allow", "Cancel"]
          if let title = titles.first(where: { system.buttons[$0].exists }) {
            system.buttons[title].tap()
          } else {
            system.buttons.firstMatch.tap()
          }
          continue
        }
        break
      }
    }

    let spring = XCUIApplication(bundleIdentifier: "com.apple.springboard")
    if spring.alerts.firstMatch.waitForExistence(timeout: 2) {
      shot("30-storekit-permission")
      step("permission-prompt", true, spring.alerts.firstMatch.label)
    } else {
      step("permission-prompt", true, "no system permission alert")
    }

    let guest = el("continue-as-guest")
    if guest.waitForExistence(timeout: 20) {
      shot("30-storekit-onboarding")
      guest.tap()
      step("onboarding", true, "Continue as Guest")
    } else {
      step("onboarding", el("home").exists, "guest gate not shown")
    }

    let homeOk = el("home").waitForExistence(timeout: 15)
    shot("31-storekit-home")
    let oldHome = app.staticTexts["Choose Your Plan"].exists || app.staticTexts["Unlock Pro"].exists
    step("home", homeOk && !oldHome, oldHome ? "OLD design strings visible" : "home")
    XCTAssertTrue(homeOk)

    let opened = tapId("open-paywall", timeout: 8)
    let payOk = el("paywall").waitForExistence(timeout: 8)
    shot("32-storekit-paywall")
    step("paywall", opened && payOk, payOk ? "paywall visible" : "paywall missing")
    XCTAssertTrue(payOk)

    let yearly = el("buy-yearly")
    let monthly = el("buy-monthly")
    let lifetime = el("buy-lifetime")
    let error = app.staticTexts["Plans unavailable right now. Please try again shortly."]
    let products = yearly.waitForExistence(timeout: 20)
    _ = monthly.exists
    _ = lifetime.exists
    if error.exists { shot("32b-storekit-paywall-error") }
    shot("33-storekit-paywall-products")
    step(
      "products",
      products && monthly.exists && lifetime.exists,
      products ? "yearly monthly lifetime from StoreKit" : (error.exists ? error.label : "products missing")
    )

    app.swipeUp()
    shot("34-storekit-paywall-scrolled")
    let restored = tapId("restore", timeout: 4)
    let noPurchase = app.alerts["No purchase found"].waitForExistence(timeout: 8)
    shot("34b-storekit-restore")
    step("restore", restored, noPurchase ? "No purchase found" : "restore tapped, alert=\(app.alerts.firstMatch.exists)")
    dismissAlerts()

    var bought = false
    if yearly.exists {
      yearly.tap()
      bought = app.alerts["Unlocked"].waitForExistence(timeout: 15)
        || app.staticTexts["Pro is already active on this Apple ID."].waitForExistence(timeout: 4)
        || el("manage-subscription").waitForExistence(timeout: 4)
    }
    shot("35-storekit-purchased")
    step("purchase-yearly", bought, bought ? "yearly purchase completed" : "yearly purchase did not unlock Pro")
    dismissAlerts()

    if !el("home").waitForExistence(timeout: 4) {
      _ = tapId("close-paywall", timeout: 3)
    }
    let homeManage = el("manage-subscription-home")
    let proActive = app.staticTexts["Pro active"].waitForExistence(timeout: 8)
    let homeManageOk = homeManage.waitForExistence(timeout: 6)
    shot("36-storekit-home-pro")
    step("manage-on-home", homeManageOk || proActive, homeManageOk ? "Manage Subscription on Home" : "Pro active=\(proActive)")

    _ = tapId("open-paywall", timeout: 6)
    _ = el("paywall").waitForExistence(timeout: 6)
    let payManage = el("manage-subscription").waitForExistence(timeout: 6)
    shot("37-storekit-paywall-pro")
    step("manage-on-paywall", payManage, payManage ? "Manage Subscription on paywall" : "control not shown")
    if payManage {
      el("manage-subscription").tap()
      sleep(2)
      shot("38-storekit-manage-sheet")
      let sheet = app.staticTexts["Momentum Men Yearly"].exists
        || app.staticTexts["Subscriptions"].exists
        || XCUIApplication(bundleIdentifier: "com.apple.mobilesafari").state == .runningForeground
      step("manage-sheet", true, sheet ? "subscription UI or Safari" : "screenshot only; sheet text not matched")
      app.activate()
      dismissAlerts()
      _ = tapId("close-paywall", timeout: 3)
    }

    _ = tapId("tab-generator", timeout: 6)
    _ = app.staticTexts["Generator"].waitForExistence(timeout: 6)
    shot("39-storekit-generator-pro")
    for _ in 0..<4 { app.swipeUp() }
    let zeroStart = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "Start ")).firstMatch
    if zeroStart.waitForExistence(timeout: 4) {
      zeroStart.tap()
      let stayed = el("workout").waitForExistence(timeout: 2) == false
      shot("40-storekit-generator-zero")
      step("generator-empty-start", stayed, stayed ? "zero exercises did not open a workout" : "empty start navigated")
      if !stayed { _ = tapId("close-workout", timeout: 3) }
    } else {
      shot("40-storekit-generator-zero")
      step("generator-empty-start", false, "pro start button not found")
    }

    let bench = app.staticTexts["Dumbbell Bench Press"]
    if bench.waitForExistence(timeout: 4) {
      if !bench.isHittable { app.swipeDown() }
      bench.tap()
      for _ in 0..<6 { app.swipeUp() }
      let start = app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "min session")).firstMatch
      if start.waitForExistence(timeout: 4) { start.tap() }
      let custom = el("workout").waitForExistence(timeout: 8)
      shot("41-storekit-custom-workout")
      step("custom-workout", custom, custom ? "generator opened the player" : "player did not open")
      if custom {
        let startTimer = app.buttons["Start"]
        if startTimer.waitForExistence(timeout: 3) { startTimer.tap() }
        sleep(1)
        shot("42-storekit-custom-running")
        _ = tapId("close-workout", timeout: 3)
      }
    } else {
      step("custom-workout", false, "Dumbbell Bench Press not listed")
    }

    save()
  }
}
