#!/usr/bin/env ruby
# Adds PaywallGate.swift to the UI-test target created by prepare-xcode-qa.rb.
# Generated ios/ project only. Does not change application source.
require 'fileutils'
require 'xcodeproj'

REPO = File.expand_path('../..', __dir__)
IOS = File.join(REPO, 'ios')
TEST_NAME = 'MomentumMenQATests'
SRC = File.join(REPO, 'qa', 'sim-gate', 'PaywallGate.swift')

abort("missing #{SRC}") unless File.exist?(SRC)
proj_path = Dir[File.join(IOS, '*.xcodeproj')].reject { |path| path.include?('.xcodeproj/') }.first
abort('no xcodeproj') unless proj_path

dest_dir = File.join(IOS, TEST_NAME)
FileUtils.mkdir_p(dest_dir)
FileUtils.cp(SRC, File.join(dest_dir, 'PaywallGate.swift'))

project = Xcodeproj::Project.open(proj_path)
target = project.targets.find { |item| item.name == TEST_NAME }
abort("missing test target #{TEST_NAME}; run prepare-xcode-qa.rb first") unless target

group = project.main_group.find_subpath(TEST_NAME, true)
group.set_source_tree('SOURCE_ROOT')
group.set_path(TEST_NAME)
already = group.files.any? { |file| file.path == 'PaywallGate.swift' }
unless already
  ref = group.new_file('PaywallGate.swift')
  target.add_file_references([ref])
  puts "added PaywallGate.swift to #{TEST_NAME}"
else
  puts "PaywallGate.swift already in #{TEST_NAME}"
end

target.build_configurations.each do |cfg|
  flags = cfg.build_settings['OTHER_LDFLAGS'] || '$(inherited)'
  flags = [flags] unless flags.is_a?(Array)
  joined = flags.join(' ')
  unless joined.include?('StoreKitTest')
    flags << '-framework'
    flags << 'StoreKitTest'
  end
  cfg.build_settings['OTHER_LDFLAGS'] = flags
end
project.save
