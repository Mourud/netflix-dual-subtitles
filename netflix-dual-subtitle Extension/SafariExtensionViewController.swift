//
//  SafariExtensionViewController.swift
//  netflix-dual-subtitle Extension
//
//  Created by Mourud Ishmam Ahmed on 2024-12-17.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
