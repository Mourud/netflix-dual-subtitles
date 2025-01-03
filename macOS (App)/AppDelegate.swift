//
//  AppDelegate.swift
//  macOS (App)
//
//  Created by Mourud Ishmam Ahmed on 2024-12-20.
//

import Cocoa
import Translation


@main
class AppDelegate: NSObject, NSApplicationDelegate {

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Override point for customization after application launch.
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
  // Translation Function
  func translate(text: String, from sourceLanguage: Locale, to targetLanguage: Locale, completion: @escaping (String?) -> Void) {
      let request = TranslationRequest(sourceText: text, sourceLanguage: sourceLanguage, targetLanguage: targetLanguage)
      let translator = Translator(configuration: TranslatorConfiguration())

      translator.translate(request) { result in
          switch result {
          case .success(let response):
              completion(response.translatedText)
          case .failure(let error):
              print("Translation error: \(error.localizedDescription)")
              completion(nil)
          }
      }
  }

  // Handle Communication from Web Extension
  func handleTranslationRequest(_ text: String, completion: @escaping (String) -> Void) {
      translate(text: text, from: Locale(identifier: "fr"), to: Locale(identifier: "en")) { translatedText in
          completion(translatedText ?? "Translation failed.")
      }
  }

}
