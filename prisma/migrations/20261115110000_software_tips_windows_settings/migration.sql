-- One-time content load (no schema change): 25 Windows settings and how-to
-- tips, each with a thumbnail from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-windows-dark-mode', 'SOFTWARE', 'Turn On Dark Mode and Night Light on Windows', 'Windows', 'Windows 10 and 11', NULL, '/tips/laptop-desk.jpg',
$tip$1. Dark mode: Settings, then Personalization, then Colors, then "Choose your mode": Dark.
2. Night light (warmer colours in the evening, easier on the eyes): Settings, then System, then Display, then Night light. Schedule it from sunset to sunrise.
3. Quick toggle: Night light is in the quick settings panel (click the Wi-Fi or volume icon in the taskbar).
4. Some apps (Chrome, Office) follow the Windows setting automatically, others have their own dark mode setting.$tip$,
ARRAY['Windows Settings'], now() - interval '400 minutes'),

('software-tip-windows-snap-layouts', 'SOFTWARE', 'Work Faster with Snap Layouts on Windows', 'Windows', 'Windows 10 and 11', NULL, '/tips/two-monitors.jpg',
$tip$Put two to four windows side by side neatly.

1. Windows 11: hover the mouse over a window's maximize button and choose a layout, or press Windows key and Z.
2. Any version: press Windows key and Left or Right arrow to snap a window to half the screen, then pick the other window to fill the other half.
3. Windows key and Up or Down arrow maximizes or minimizes.
4. Drag a window to a screen corner to snap it to a quarter.
5. Turn the features on or off in Settings, then System, then Multitasking.$tip$,
ARRAY['Windows Snap'], now() - interval '399 minutes'),

('software-tip-windows-virtual-desktops', 'SOFTWARE', 'Use Virtual Desktops to Organise Your Work', 'Windows', 'Windows 10 and 11', NULL, '/tips/desk-two-monitors.jpg',
$tip$Virtual desktops give you separate screens for different tasks, for example one for work and one for personal use.

1. Press Windows key and Tab, then New desktop.
2. Windows key, Ctrl and D: create a new desktop.
3. Windows key, Ctrl and Left or Right arrow: switch between desktops.
4. Windows key, Ctrl and F4: close the current desktop (its windows move to the next one).
5. Drag a window from one desktop to another in the Windows key and Tab view.
6. Windows 11 lets you give each desktop its own name and wallpaper.$tip$,
ARRAY['Task View'], now() - interval '398 minutes'),

('software-tip-windows-default-apps', 'SOFTWARE', 'Change Default Apps on Windows (Browser, PDF, Photos)', 'Windows', 'Windows 10 and 11', NULL, '/tips/pointing-laptop.jpg',
$tip$1. Settings, then Apps, then Default apps.
2. Browser: find Chrome (or your browser) in the list and click "Set default".
3. A file type: type it in the search box at the top (for example .pdf) and choose the app to open it.
4. Quick way: right-click a file, then "Open with", then "Choose another app", pick the app and tick "Always use this app".
5. Many apps ask to become the default when you first open them. That's the easiest moment to say yes.$tip$,
ARRAY['Windows Settings'], now() - interval '397 minutes'),

('software-tip-windows-uninstall-programs', 'SOFTWARE', 'Uninstall Programs Properly on Windows', 'Windows', 'Windows 10 and 11', NULL, '/tips/laptop-desk.jpg',
$tip$1. Settings, then Apps, then Installed apps. Click the three dots next to the app, then Uninstall.
2. Older programs: Control Panel, then Programs and Features, double-click the program.
3. Sort by size or install date to find big or unknown programs.
4. Program won't uninstall? Restart the PC and try again, or run the program's own uninstaller from its folder in Program Files.
5. Don't just delete the program's folder. It leaves broken entries behind.
6. Never remove things you don't recognise that are made by Microsoft, Intel, AMD, NVIDIA, Realtek or the laptop maker. They're usually drivers.$tip$,
ARRAY['Windows Settings', 'Control Panel'], now() - interval '396 minutes'),

('software-tip-windows-winget', 'SOFTWARE', 'Install and Update Apps Safely with winget', 'Windows', 'Windows 10 and 11', NULL, '/tips/code-dark.jpg',
$tip$winget is Windows' built-in app installer. It gets programs from official sources, without fake download buttons or bundled adware.

1. Right-click Start, then Terminal (or Command Prompt).
2. Find an app: winget search vlc
3. Install it: winget install VideoLAN.VLC (use the Id shown by search)
4. Update everything at once: winget upgrade --all
5. See what's installed: winget list

Great after a fresh Windows install: install Chrome, VLC, 7-Zip and others in a few minutes. If winget isn't found, update "App Installer" from the Microsoft Store.$tip$,
ARRAY['winget', 'Terminal'], now() - interval '395 minutes'),

('software-tip-windows-two-monitors', 'SOFTWARE', 'Connect a Second Monitor, TV or Projector', 'Windows', 'Windows 10 and 11', NULL, '/tips/two-monitors.jpg',
$tip$1. Connect the cable (HDMI, DisplayPort or USB-C) and turn the screen on. Choose the right input on the TV or monitor.
2. Press Windows key and P and choose: Duplicate (same picture on both, good for presentations), Extend (more space), or Second screen only.
3. Settings, then System, then Display: click Identify, drag the screens to match where they sit on your desk, and choose your main display.
4. Set the resolution and scale for each screen separately.
5. No picture? Try another cable or port, update the graphics driver, and click "Detect" in Display settings.
6. No sound on the TV? Choose the TV as the sound output (see our no sound tip).$tip$,
ARRAY['Display Settings', 'HDMI cable'], now() - interval '394 minutes'),

('software-tip-windows-power-sleep', 'SOFTWARE', 'Change Sleep, Screen Off and Lid Settings on a Laptop', 'Windows', 'Windows laptops', NULL, '/tips/man-fixing-laptop.jpg',
$tip$1. Screen and sleep times: Settings, then System, then Power and battery, then Screen and sleep (Windows 10: System, then Power and sleep).
2. Power mode: Best power efficiency on battery, Best performance when plugged in.
3. Closing the lid: Control Panel, then Power Options, then "Choose what closing the lid does". Choose Sleep, Hibernate, Shut down or Do nothing, separately for battery and plugged in.
4. Battery saver turns on automatically at 20 percent. Change it in Power and battery.
5. Laptop wakes up by itself in the bag? Set the lid to Hibernate on battery.$tip$,
ARRAY['Power Settings'], now() - interval '393 minutes'),

('software-tip-windows-device-encryption', 'SOFTWARE', 'Check Disk Encryption (BitLocker) and Back Up the Key', 'Windows', 'Windows 10 and 11', NULL, '/tips/ssd-m2.jpg',
$tip$Many new laptops encrypt the drive automatically. It protects your files if the laptop is stolen, but you need the recovery key if something goes wrong.

1. Check: Settings, then Privacy and security, then Device encryption (Windows Home), or Control Panel, then BitLocker Drive Encryption (Pro editions).
2. If it's on, back up the recovery key now: in BitLocker Drive Encryption click "Back up your recovery key", and save it to your Microsoft account, a USB drive or print it.
3. Signed in with a Microsoft account? The key is usually saved automatically at account.microsoft.com/devices/recoverykey.
4. Before a BIOS update, motherboard repair or SSD move, suspend BitLocker first (Suspend protection) to avoid a recovery prompt.

Without the key, an encrypted drive's files can't be recovered.$tip$,
ARRAY['BitLocker', 'Microsoft Account'], now() - interval '392 minutes'),

('software-tip-bitlocker-recovery-key', 'SOFTWARE', 'PC Asks for a BitLocker Recovery Key: What to Do', 'Windows', 'Windows 10 and 11', NULL, '/tips/broken-laptop-screen.jpg',
$tip$This blue screen often appears after a BIOS update, repair or hardware change.

1. Write down the Key ID shown on the screen (the first 8 characters are enough).
2. On a phone or another PC, go to aka.ms/myrecoverykey and sign in with the Microsoft account used on that PC.
3. Find the key whose Key ID matches, and type the 48-digit recovery key on the PC.
4. Work or school laptop? Ask the IT department, they store the keys.
5. Also check for a printed copy, a text file on a USB drive, or a saved PDF.

If no account has the key, the drive's data can't be unlocked. The only option is erasing and reinstalling Windows.$tip$,
ARRAY['Microsoft Account'], now() - interval '391 minutes'),

('software-tip-windows-add-user', 'SOFTWARE', 'Add Another User Account on Windows', 'Windows', 'Windows 10 and 11', NULL, '/tips/pointing-laptop.jpg',
$tip$Give each person their own account so their files, passwords and settings stay separate.

1. Settings, then Accounts, then Other users (or Family and other users), then Add account.
2. With a Microsoft account: enter their email.
3. Local account (no email): click "I don't have this person's sign-in information", then "Add a user without a Microsoft account", and set a name and password.
4. New accounts are Standard users. Keep them that way for children and shared PCs. To change: select the account, then Change account type.
5. Children: use the Family option to set screen time and content limits.$tip$,
ARRAY['Windows Settings'], now() - interval '390 minutes'),

('software-tip-windows-screenshot-record', 'SOFTWARE', 'Take Screenshots and Record the Screen on Windows', 'Windows', 'Windows 10 and 11', NULL, '/tips/keyboard-2.jpg',
$tip$1. Windows key, Shift and S: select part of the screen. The screenshot is copied, and a notification lets you edit and save it.
2. Print Screen key: on Windows 11 it opens the same snipping tool. Windows key and Print Screen saves the whole screen to Pictures, then Screenshots.
3. Screen recording on Windows 11: open Snipping Tool, click the video camera icon, select an area and press Start.
4. Recording a game or app window: press Windows key and G for Xbox Game Bar, or Windows key, Alt and R to start and stop recording. Videos go to Videos, then Captures.
5. Paste a screenshot straight into WhatsApp Web or an email with Ctrl and V.$tip$,
ARRAY['Snipping Tool', 'Xbox Game Bar'], now() - interval '389 minutes'),

('software-tip-windows-pause-updates', 'SOFTWARE', 'Stop Windows Updates Restarting at the Wrong Time', 'Windows', 'Windows 10 and 11', NULL, '/tips/code-screen.jpg',
$tip$1. Active hours: Settings, then Windows Update, then Advanced options, then Active hours. Windows won't restart for updates during these hours.
2. Pause updates: Settings, then Windows Update, then Pause updates for 1 to 5 weeks. Useful before an exam, presentation or busy week.
3. Restart notifications: turn on "Notify me when a restart is required" in Advanced options.
4. Metered connection: on mobile data or a small bundle, set the Wi-Fi as metered (Settings, then Network and internet, then the network, then Metered connection) so big updates wait.

Don't pause forever. Updates fix serious security problems.$tip$,
ARRAY['Windows Update'], now() - interval '388 minutes'),

('software-tip-windows-file-extensions', 'SOFTWARE', 'Show File Extensions to Spot Fake Files', 'Windows', 'Windows 10 and 11', NULL, '/tips/alert-message-2.jpg',
$tip$Windows hides file extensions by default, so "invoice.pdf.exe" looks like "invoice.pdf". It's a common trick to get people to run viruses.

1. Windows 11: open File Explorer, then View, then Show, then tick "File name extensions". Tick "Hidden items" too if needed.
2. Windows 10: File Explorer, then the View tab, then tick "File name extensions".
3. Be careful with files ending in .exe, .scr, .bat, .vbs, .js or .msi that arrive by email or WhatsApp, especially if they pretend to be documents or photos.
4. Right-click a suspicious file and choose "Scan with Microsoft Defender" before opening it.$tip$,
ARRAY['File Explorer'], now() - interval '387 minutes'),

('software-tip-windows-zip-files', 'SOFTWARE', 'Zip and Unzip Files on Windows', 'Windows', 'Windows 10 and 11', NULL, '/tips/usb-drive-hand.jpg',
$tip$1. Zip: select files or a folder, right-click, then "Compress to ZIP file" (Windows 10: Send to, then Compressed folder). Good for emailing many files at once.
2. Unzip: right-click the .zip file, then "Extract All", choose where, and click Extract.
3. Don't run programs directly inside a zip. Extract first, or they may not work.
4. RAR and 7z files: recent Windows 11 versions can open them. Otherwise install 7-Zip from 7-zip.org (free).
5. Password-protected zips need the password from the sender. Be wary of password-protected zips from strangers: they're used to hide viruses from scanners.$tip$,
ARRAY['File Explorer', '7-Zip'], now() - interval '386 minutes'),

('software-tip-windows-nearby-sharing', 'SOFTWARE', 'Send Files Between Windows PCs Without a USB Drive', 'Windows', 'Windows 10 and 11', NULL, '/tips/laptop-and-phone.jpg',
$tip$1. Nearby sharing (PCs close together): Settings, then System, then Nearby sharing, set to "Everyone nearby" on both PCs. Right-click a file, then Share, and pick the other PC. Bluetooth must be on.
2. OneDrive: put the file in OneDrive, right-click, then Share, and send the link.
3. Big files on the same Wi-Fi: right-click a folder, then Properties, then Sharing, then Share, and add a user. Open \\PC-NAME on the other PC.
4. To an Android phone: use the Quick Share app for Windows (see our Quick Share tip).

Turn Nearby sharing back to "My devices only" or Off when done.$tip$,
ARRAY['Nearby sharing', 'OneDrive'], now() - interval '385 minutes'),

('software-tip-windows-bluetooth', 'SOFTWARE', 'Connect Bluetooth Headphones, Speakers or Mice to Windows', 'Windows', 'Windows 10 and 11', NULL, '/tips/earbuds-phone.jpg',
$tip$1. Put the device in pairing mode (usually hold its power or Bluetooth button until a light flashes).
2. Settings, then Bluetooth and devices, then Add device, then Bluetooth. Choose the device from the list.
3. Already paired but not working? Click the device, then Remove device, and pair again.
4. Sound still coming from laptop speakers? Choose the headphones in the volume menu in the taskbar.
5. No Bluetooth option at all? Check Device Manager for the Bluetooth adapter and install its driver from the laptop maker's site. Desktop PCs often need a USB Bluetooth adapter.$tip$,
ARRAY['Bluetooth Settings'], now() - interval '384 minutes'),

('software-tip-windows-date-time', 'SOFTWARE', 'Fix Wrong Date and Time on Windows', 'Windows', 'Windows 10 and 11', NULL, '/tips/keyboard.jpg',
$tip$A wrong clock causes "Your connection isn't private" errors on websites, and breaks Windows Update and activation.

1. Settings, then Time and language, then Date and time.
2. Turn on "Set time automatically" and "Set time zone automatically", then click "Sync now".
3. Or set the time zone yourself: Uganda, Kenya and Tanzania use (UTC+03:00) Nairobi.
4. Clock wrong again every time the PC starts? The small CMOS battery on the motherboard is flat. It's a cheap, quick replacement, bring the PC in.$tip$,
ARRAY['Windows Settings'], now() - interval '383 minutes'),

('software-tip-windows-reliability-monitor', 'SOFTWARE', 'Find Out Why a PC Crashed or Froze', 'Windows', 'Windows 10 and 11', NULL, '/tips/code-dark.jpg',
$tip$1. Search the Start menu for "View reliability history" (Reliability Monitor).
2. Each day shows red X marks for crashes and failures. Click a day to see which program, driver or update failed.
3. Double-click an entry for technical details, such as the faulting module.
4. Patterns help: crashes after a certain update or driver mean you can roll that back. Random crashes everywhere point to RAM, drive or overheating (see our memory and drive health tips).
5. For more detail, Event Viewer (right-click Start) shows logs under Windows Logs, then System.$tip$,
ARRAY['Reliability Monitor', 'Event Viewer'], now() - interval '382 minutes'),

('software-tip-windows-task-manager', 'SOFTWARE', 'Close a Frozen Program with Task Manager', 'Windows', 'Windows 10 and 11', NULL, '/tips/pointing-laptop.jpg',
$tip$1. Press Ctrl, Shift and Esc to open Task Manager. Click "More details" if it looks small.
2. Select the program that says "Not responding" and click End task. Unsaved work in it will be lost.
3. Whole screen frozen? Press Ctrl, Alt and Delete, then Task Manager. Or Windows key, Ctrl, Shift and B to restart the graphics driver.
4. Windows 11 can add "End task" to the taskbar right-click menu: Settings, then System, then For developers, then End task.
5. Explorer (taskbar and desktop) stuck? In Task Manager, find Windows Explorer, right-click, then Restart.$tip$,
ARRAY['Task Manager'], now() - interval '381 minutes'),

('software-tip-windows-security-checkup', 'SOFTWARE', 'Windows Security Settings Checkup', 'Windows', 'Windows 10 and 11', NULL, '/tips/alert-message.jpg',
$tip$Open Windows Security from the Start menu. Every section should show a green tick.

1. Virus and threat protection: Real-time protection on. Click "Protection updates" and check for updates.
2. Firewall and network protection: Domain, Private and Public networks all on.
3. App and browser control: Reputation-based protection on. It blocks dangerous downloads and fake sites.
4. Device security: Core isolation (Memory integrity) on if available. If an old driver blocks it, update or remove that driver.
5. Account protection: sign in with a Microsoft account and set up Windows Hello.

You don't need a second antivirus. Two antivirus programs together slow the PC down.$tip$,
ARRAY['Windows Security'], now() - interval '380 minutes'),

('software-tip-windows-change-dns', 'SOFTWARE', 'Change DNS for Faster and Safer Browsing', 'Windows', 'Windows 10 and 11', NULL, '/tips/ethernet-cable.jpg',
$tip$Your internet provider's DNS can be slow or unreliable. Public DNS often loads websites faster.

1. Settings, then Network and internet, then Wi-Fi (or Ethernet), then your network's Hardware properties.
2. Next to "DNS server assignment" click Edit, choose Manual, and turn on IPv4.
3. Preferred DNS: 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google). Alternate DNS: 1.0.0.1 or 8.8.4.4.
4. Windows 11 can also turn on "DNS over HTTPS" there for more privacy.
5. Save, then open Command Prompt and run ipconfig /flushdns.

Websites stopped loading? Set it back to Automatic (DHCP).$tip$,
ARRAY['Network Settings', 'Command Prompt'], now() - interval '379 minutes'),

('software-tip-windows-sleep-hibernate', 'SOFTWARE', 'Sleep, Hibernate or Shut Down: Which to Use', 'Windows', 'Windows 10 and 11', NULL, '/tips/laptop-desk.jpg',
$tip$Sleep: the PC pauses with everything open and wakes in seconds. It uses a little battery. Best for short breaks.
Hibernate: saves everything to the drive and switches off fully, then reopens where you left off. No battery use. Best for laptops in a bag or overnight.
Shut down: closes everything. Restart is better for fixing problems (see our Fast Startup tip).

Turn on Hibernate in the power menu: Control Panel, then Power Options, then "Choose what the power buttons do", then "Change settings that are currently unavailable", then tick Hibernate.
Not listed? Open Command Prompt as administrator and run: powercfg /hibernate on$tip$,
ARRAY['Power Options'], now() - interval '378 minutes'),

('software-tip-windows-clean-boot', 'SOFTWARE', 'Find a Problem Program with a Clean Boot', 'Windows', 'Windows 10 and 11', NULL, '/tips/code-screen.jpg',
$tip$A clean boot starts Windows with only Microsoft services. If a problem disappears, another program is causing it.

1. Press Windows key and R, type msconfig and press Enter.
2. Services tab: tick "Hide all Microsoft services", then click "Disable all".
3. Startup: open Task Manager, then Startup apps, and disable everything.
4. Restart and test.
5. Problem gone? Turn services back on half at a time, restarting each time, until the problem returns. The last group you enabled contains the culprit.
6. When finished, go back to msconfig and choose "Normal startup".$tip$,
ARRAY['System Configuration', 'Task Manager'], now() - interval '377 minutes'),

('software-tip-windows-recovery-drive', 'SOFTWARE', 'Make a Windows Recovery USB Before You Need It', 'Windows', 'Windows 10 and 11', NULL, '/tips/usb-drive-hand.jpg',
$tip$A recovery drive lets you repair or reinstall Windows even if the PC won't start.

1. Use a USB drive of at least 16 GB (32 GB is safer). Everything on it will be erased.
2. Search the Start menu for "Create a recovery drive" and open it.
3. Tick "Back up system files to the recovery drive" and click Next.
4. Choose the USB drive and click Create. It can take an hour.
5. Label the USB drive and keep it safe.

To use it: plug it in, open the boot menu (see our BIOS keys tip), and boot from the USB to reach Startup Repair, System Restore and reinstall options.$tip$,
ARRAY['Recovery Drive', 'USB flash drive (16 GB+)'], now() - interval '376 minutes')
ON CONFLICT ("id") DO NOTHING;
