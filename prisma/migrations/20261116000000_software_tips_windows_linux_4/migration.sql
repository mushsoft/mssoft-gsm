-- One-time content load (no schema change): 20 more Windows tips and 8 more
-- Linux tips, each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-windows-widgets-news', 'SOFTWARE', 'Turn Off Widgets and the News Feed on Windows 11', 'Windows', 'Windows 11', NULL, '/tips/windows-widgets-news.jpg',
$tip$1. Remove the weather and news button: Settings, Personalisation, Taskbar, turn off Widgets.
2. Keep widgets but hide the news: open Widgets (Windows key and W), click the gear, and turn off "Show Microsoft Start feed" (or Discover feed).
3. Stop widgets opening when you hover: in the same settings, turn off "Open widgets board on hover".
4. Add useful widgets only: calendar, to do, weather, photos.

Fewer widgets also means less data used in the background on a metered connection.$tip$,
ARRAY['Settings', 'Widgets'], now() - interval '1400 minutes'),

('software-tip-windows-taskbar', 'SOFTWARE', 'Customise the Windows Taskbar', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-taskbar.jpg',
$tip$1. Right-click the taskbar, Taskbar settings.
2. Taskbar alignment (Windows 11): Left, if you prefer the Start button in the corner like Windows 10.
3. Hide what you don't use: Search box (or show only the icon), Task view, Widgets, Chat or Copilot.
4. Pin apps: right-click an open app's icon, Pin to taskbar. Drag icons to reorder.
5. Automatically hide the taskbar for more screen space on small laptops.
6. Show seconds in the clock (Windows 11, Taskbar behaviours).

Taskbar frozen? Restart Windows Explorer in Task Manager.$tip$,
ARRAY['Taskbar settings'], now() - interval '1401 minutes'),

('software-tip-windows-start-menu', 'SOFTWARE', 'Organise the Windows Start Menu', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-start-menu.jpg',
$tip$1. Pin apps you use: right-click an app in All apps, Pin to Start. Unpin ones you don't need.
2. Drag pinned apps to reorder. Drag one onto another to make a folder (Windows 11).
3. Hide the Recommended section's recent files: Settings, Personalisation, Start, turn off recent files and recommended items.
4. Add folders next to the power button (Documents, Downloads, Settings): Settings, Personalisation, Start, Folders.
5. Type straight after pressing the Windows key to search for any app or setting.

Uninstall unwanted pre-installed apps from the Start menu: right-click, Uninstall.$tip$,
ARRAY['Start menu'], now() - interval '1402 minutes'),

('software-tip-windows-sticky-notes', 'SOFTWARE', 'Sticky Notes on Windows: Quick Notes That Sync to Your Phone', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-sticky-notes.jpg',
$tip$1. Open Sticky Notes from the Start menu.
2. Click + for a new note. Use bold, lists and add images.
3. Sign in with your Microsoft account to sync notes with OneNote on your phone and on other PCs.
4. Close a note to tidy the desktop. Find all notes in the notes list.
5. Ctrl and N creates a new note, Ctrl and D deletes one.

Great for quick phone numbers, prices and tasks. For important information, use a proper backup like OneNote or Google Keep (see our tip).$tip$,
ARRAY['Sticky Notes', 'OneNote'], now() - interval '1403 minutes'),

('software-tip-windows-calculator', 'SOFTWARE', 'Windows Calculator: Scientific, Date and Unit Converter Modes', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-calculator.jpg',
$tip$Open Calculator and click the menu (three lines) at the top left.

Standard: everyday sums. History shows earlier calculations.
Scientific: powers, roots, percentages and trigonometry for students.
Programmer: binary and hex for IT work.
Date calculation: days between two dates, or add days to a date (warranty and payment due dates).
Converters: currency (needs internet), length, weight, area, temperature, data size and more.

Keep on top: the small window icon keeps Calculator floating over other windows.

Shortcut: type numbers with the keyboard and press Enter.$tip$,
ARRAY['Calculator'], now() - interval '1404 minutes'),

('software-tip-windows-clock-app', 'SOFTWARE', 'Windows Clock App: Alarms, Timers and Focus Sessions', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-clock-app.jpg',
$tip$1. Open Clock from the Start menu.
2. Timer: for cooking, breaks or a soldering job. Several timers can run at once.
3. Alarm: alarms ring only if the PC is awake. Laptops in sleep usually won't ring, so use your phone for important alarms.
4. Stopwatch with laps.
5. World clock: compare times for suppliers or family abroad.
6. Focus sessions (Windows 11): work for 25 minutes, then a short break. It can turn on Do not disturb.$tip$,
ARRAY['Clock app'], now() - interval '1405 minutes'),

('software-tip-windows-voice-typing', 'SOFTWARE', 'Voice Typing on Windows: Talk Instead of Typing', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-voice-typing.jpg',
$tip$1. Click where you want the text (an email, Word, WhatsApp desktop).
2. Press Windows key and H. Allow the microphone if asked.
3. Speak clearly. Say "comma", "full stop", "question mark" and "new line".
4. Press Windows key and H again (or say "stop listening") to stop.
5. Turn on automatic punctuation in the voice typing settings (gear icon).

Needs internet for most languages. A headset microphone gives far better results than the laptop's built-in mic in a noisy room.$tip$,
ARRAY['Voice typing'], now() - interval '1406 minutes'),

('software-tip-windows-emoji-panel', 'SOFTWARE', 'Emojis, Symbols and Special Characters on Windows', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-emoji-panel.jpg',
$tip$1. Press Windows key and . (full stop) or Windows key and ; in any text box.
2. Choose an emoji, or switch tabs for GIFs, kaomoji and symbols.
3. Symbols include currency signs, maths symbols, arrows and accented letters.
4. Start typing after opening the panel to search for an emoji by name.
5. Clipboard history is in the same panel (see our clipboard tip).

Need the degree sign or copyright symbol often? Find them under Symbols. They stay in "Recently used".$tip$,
ARRAY['Emoji panel'], now() - interval '1407 minutes'),

('software-tip-windows-sandbox', 'SOFTWARE', 'Windows Sandbox: Test Suspicious Programs Safely', 'Windows', 'Windows 10 and 11 Pro', NULL, '/tips/windows-sandbox.jpg',
$tip$Windows Sandbox is a throwaway copy of Windows. Anything installed inside it is deleted when you close it.

1. Needs Windows Pro (or Enterprise) and virtualisation turned on in the BIOS.
2. Search "Turn Windows features on or off", tick Windows Sandbox, OK, and restart.
3. Open Windows Sandbox from Start. Copy the installer in (Ctrl and C, then Ctrl and V inside the window).
4. Test it inside. When you close the sandbox, everything inside is erased.

Still don't run cracked software or "free activators" on your real PC. Sandbox helps test, it isn't a licence to take risks.$tip$,
ARRAY['Windows Sandbox'], now() - interval '1408 minutes'),

('software-tip-windows-lid-power-button', 'SOFTWARE', 'Choose What Happens When You Close the Laptop Lid', 'Windows', 'Windows laptops', NULL, '/tips/windows-lid-power-button.jpg',
$tip$1. Windows 11 (newer versions): Settings, System, Power and battery, Lid and power button controls.
   Or Control Panel, Power Options, "Choose what closing the lid does".
2. Choose for On battery and Plugged in: Do nothing, Sleep, Hibernate or Shut down.
3. "Do nothing" lets you use the laptop closed with an external monitor and keyboard.
4. The power button can be set to Shut down, so pressing it doesn't just sleep.

Before putting a laptop in a bag, make sure it's really asleep or shut down. A laptop that stays on in a bag can overheat (see our laptop travel tip).$tip$,
ARRAY['Power Options'], now() - interval '1409 minutes'),

('software-tip-windows-active-hours', 'SOFTWARE', 'Stop Windows Restarting for Updates While You Work', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-active-hours.jpg',
$tip$1. Settings, Windows Update, Advanced options, Active hours.
2. Set them to your working hours (for example 07:00 to 21:00), or let Windows adjust automatically.
3. Windows won't restart automatically during those hours.
4. Turn on "Notify me when a restart is required" so you get a warning.
5. When an update is ready, choose Schedule the restart for lunch or evening.

Save your work regularly anyway. Pausing updates for a while is also possible (see our pause updates tip), but install them soon after.$tip$,
ARRAY['Windows Update'], now() - interval '1410 minutes'),

('software-tip-windows-task-scheduler', 'SOFTWARE', 'Run Tasks Automatically with Windows Task Scheduler', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-task-scheduler.jpg',
$tip$Example: shut down the shop PC automatically at 22:00.

1. Search Task Scheduler and open it.
2. Click Create Basic Task, give it a name, Next.
3. Trigger: Daily, set 22:00.
4. Action: Start a program. Program: shutdown. Arguments: /s /t 60 (shuts down after 60 seconds).
5. Finish. Right-click the task to Run, Disable or Delete it.

Other ideas: open a backup script every evening, or start a program when you sign in. Avoid deleting or changing tasks you didn't create. Many belong to Windows and drivers.$tip$,
ARRAY['Task Scheduler'], now() - interval '1411 minutes'),

('software-tip-windows-photos-app', 'SOFTWARE', 'Edit Photos for Free with the Windows Photos App', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-photos-app.jpg',
$tip$1. Open a picture, then click Edit image (or Ctrl and E).
2. Crop and rotate, straighten crooked photos, and choose sizes like square for social media.
3. Adjustment: brightness, contrast, highlights, shadows, colour.
4. Filters for a quick look.
5. Background blur (Windows 11): blurs the background behind a person or product.
6. Save a copy so the original stays untouched.
7. Resize for WhatsApp or email: three dots, Resize image.

For product photos for selling online, see our product photos tip.$tip$,
ARRAY['Photos app'], now() - interval '1412 minutes'),

('software-tip-windows-clipchamp', 'SOFTWARE', 'Make Videos for Free with Clipchamp on Windows', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-clipchamp.jpg',
$tip$Clipchamp is Microsoft's free video editor (built into Windows 11, free from the Microsoft Store on Windows 10).

1. Open Clipchamp and create a new video.
2. Import your phone clips and photos, then drag them to the timeline.
3. Trim, split, add text, music, transitions and stickers.
4. Auto captions: writes subtitles from the speech (great for TikTok and WhatsApp status).
5. Choose the size: 16:9 for YouTube, 9:16 for TikTok and status.
6. Export in 1080p for free.

Use music you have the right to use. Clipchamp's own stock music is safe.$tip$,
ARRAY['Clipchamp'], now() - interval '1413 minutes'),

('software-tip-windows-paint-remove-background', 'SOFTWARE', 'Remove a Photo Background with Windows Paint', 'Windows', 'Windows 11', NULL, '/tips/windows-paint-remove-background.jpg',
$tip$The updated Paint in Windows 11 can cut out the subject of a photo in one click.

1. Open the photo in Paint (right-click, Open with, Paint).
2. Click Remove background in the toolbar (Image section).
3. The background disappears, leaving the person or product.
4. To add a new plain background, use Layers: add a layer, fill it white, and move it under the photo.
5. File, Save as, PNG keeps the transparent background.

Update Paint from the Microsoft Store if the button is missing. Good for product photos on a clean white background.$tip$,
ARRAY['Paint'], now() - interval '1414 minutes'),

('software-tip-windows-store-updates', 'SOFTWARE', 'Update Microsoft Store Apps (and Fix Old App Versions)', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-store-updates.jpg',
$tip$1. Open the Microsoft Store and click Library (or Downloads) at the bottom left.
2. Click Get updates.
3. Store app settings (profile picture, Settings): turn on App updates so they update automatically.
4. An app not opening? Settings, Apps, Installed apps, the app, Advanced options, Repair or Reset.
5. Store itself broken? See our Microsoft Store fix tip.

Programs installed from websites (Chrome, Zoom, VLC) update themselves or need manual updates. winget can update many at once (see our winget tip).$tip$,
ARRAY['Microsoft Store'], now() - interval '1415 minutes'),

('software-tip-windows-visual-effects', 'SOFTWARE', 'Make an Old PC Feel Faster: Turn Off Visual Effects', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-visual-effects.jpg',
$tip$1. Settings, Accessibility, Visual effects: turn off Animation effects and Transparency effects.
2. For more: press Windows key and R, type sysdm.cpl, Advanced tab, Performance Settings.
3. Choose "Adjust for best performance", then tick back "Smooth edges of screen fonts" and "Show thumbnails instead of icons" so it still looks good.
4. Click Apply.

Windows will look plainer but open windows and menus faster on old laptops. The biggest speed boost is still an SSD (see our SSD tip).$tip$,
ARRAY['Settings', 'System Properties'], now() - interval '1416 minutes'),

('software-tip-scan-usb-for-viruses', 'SOFTWARE', 'Scan a USB Drive or Folder for Viruses on Windows', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/scan-usb-for-viruses.jpg',
$tip$USB drives from cyber cafés and printing shops often carry viruses that hide your files.

1. Plug in the drive. Don't open strange files on it like "Copy of" shortcuts.
2. In File Explorer, right-click the drive, Scan with Microsoft Defender (Windows 11: Show more options first).
3. Remove any threats found.
4. Full scan of the PC: Windows Security, Virus and threat protection, Scan options, Full scan.
5. Files missing but space used? They may be hidden by a virus. After cleaning, show hidden files (see our file extensions tip).

Turn on "Scan removable drives" in Defender settings, and never run .exe files from flash disks you don't trust.$tip$,
ARRAY['Microsoft Defender'], now() - interval '1417 minutes'),

('software-tip-public-computer-safety', 'SOFTWARE', 'Using Cyber Café and Shared Computers Safely', 'Windows', 'Shared and public PCs', NULL, '/tips/public-computer-safety.jpg',
$tip$1. Use a private (Incognito) window, or Guest mode in Chrome.
2. Never tick "Remember me" or let the browser save passwords.
3. Avoid banking and mobile money on public computers.
4. Sign out of email, WhatsApp Web and Google Drive, then close the browser.
5. Delete files you downloaded or scanned, and empty the Recycle Bin.
6. Look for strange devices between the keyboard cable and the computer (keyloggers).
7. Two-step verification protects you if a password is stolen (see our tips).

If you think you left an account open, sign out of all devices from your phone (account security settings).$tip$,
ARRAY['Incognito mode'], now() - interval '1418 minutes'),

('software-tip-windows-gaming-performance', 'SOFTWARE', 'Get Smoother Games on a Windows PC or Laptop', 'Windows', 'Windows 10, Windows 11', NULL, '/tips/windows-gaming-performance.jpg',
$tip$1. Plug in the laptop charger. Laptops slow down on battery.
2. Settings, Gaming, Game Mode: On.
3. Laptops with two graphics chips: Settings, System, Display, Graphics. Set your game to "High performance".
4. Update the graphics driver from NVIDIA, AMD or Intel.
5. Close browsers, downloads and chat apps while playing.
6. Lower in-game settings: shadows and resolution first.
7. Press Windows key and G for the Game Bar to see FPS and usage.

Laptop hot and throttling? Clean the fans and repaste (see our overheating tip).$tip$,
ARRAY['Game Mode', 'Graphics settings'], now() - interval '1419 minutes'),

('software-tip-ubuntu-release-upgrade', 'SOFTWARE', 'Upgrade Ubuntu to the Next LTS Version', 'Linux', 'Ubuntu', NULL, '/tips/ubuntu-release-upgrade.jpg',
$tip$1. Back up your files and make a Timeshift snapshot (see our tips).
2. Install all current updates first: sudo apt update and sudo apt full-upgrade, then restart.
3. Software Updater offers the new LTS version a few months after release. Click Upgrade when it appears.
4. Or in Terminal: sudo do-release-upgrade
5. Keep the laptop plugged in and online. Answer the questions (usually keep the current files). It takes 30 to 90 minutes.
6. Restart when asked.

Linux Mint uses its own upgrade tool, so follow the official guide on linuxmint.com instead.$tip$,
ARRAY['Software Updater', 'do-release-upgrade'], now() - interval '1420 minutes'),

('software-tip-linux-no-sound', 'SOFTWARE', 'No Sound on Linux: Quick Fixes', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-no-sound.jpg',
$tip$1. Click the volume icon and check the right output is chosen (speakers, headphones or HDMI TV).
2. Settings, Sound: choose the output device and test it.
3. More control: sudo apt install pavucontrol, open Volume Control, and check the Output Devices and Configuration tabs. Nothing should be muted or "Off".
4. In Terminal run alsamixer, press F6 to choose the sound card, and unmute channels with M.
5. Restart the sound system: systemctl --user restart pipewire pipewire-pulse wireplumber
6. HDMI no sound: select the HDMI profile in pavucontrol's Configuration tab.$tip$,
ARRAY['pavucontrol', 'alsamixer'], now() - interval '1421 minutes'),

('software-tip-linux-wifi-hotspot', 'SOFTWARE', 'Share Internet from a Linux Laptop (Wi-Fi Hotspot)', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-wifi-hotspot.jpg',
$tip$1. Connect the laptop to the internet with a cable or a USB modem.
2. Ubuntu: Settings, Wi-Fi, three dots menu, Turn On Wi-Fi Hotspot. Set the name and password.
3. Terminal option:
nmcli device wifi hotspot ssid MyHotspot password StrongPass123
4. Connect your phone to that network.
5. Turn it off from the same menu, or nmcli connection down Hotspot

Some Wi-Fi cards can't share Wi-Fi to Wi-Fi at the same time. Use a cable for the laptop's own connection.$tip$,
ARRAY['Wi-Fi settings', 'nmcli'], now() - interval '1422 minutes'),

('software-tip-linux-display-scaling', 'SOFTWARE', 'Fix Tiny or Huge Text on Linux (Display Scaling)', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-display-scaling.jpg',
$tip$1. Ubuntu: Settings, Displays. Choose the right resolution, then Scale (100%, 125%, 150%, 200%).
2. Fractional scaling (125%, 150%): turn on the Fractional Scaling switch in the same page.
3. Linux Mint: System Settings, Display, User interface scaling (Normal or Double), plus fractional scaling in the display settings.
4. Text only: Settings, Accessibility, Large Text (or Fonts in Mint, Text scaling factor).
5. Firefox and Chrome: Ctrl and plus to zoom web pages.

Only low resolutions offered? Install the graphics driver (see our Linux drivers tip).$tip$,
ARRAY['Display settings'], now() - interval '1423 minutes'),

('software-tip-linux-media-codecs', 'SOFTWARE', 'Play All Videos and Music on Ubuntu (Media Codecs)', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-media-codecs.jpg',
$tip$Some video and audio formats need extra codecs on Ubuntu.

1. Install them: sudo apt install ubuntu-restricted-extras (accept the font licence with Tab and Enter).
2. Install VLC, which plays almost everything: sudo apt install vlc (or from App Center).
3. During Ubuntu installation, ticking "Install third-party software" adds most codecs automatically.
4. Linux Mint: the Welcome screen has "Install multimedia codecs", or search for "Multimedia Codecs" in the menu.

Right-click a video, Open With, VLC, and set it as default.$tip$,
ARRAY['ubuntu-restricted-extras', 'VLC'], now() - interval '1424 minutes'),

('software-tip-linux-bluetooth', 'SOFTWARE', 'Connect Bluetooth Earbuds and Speakers on Linux', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-bluetooth.jpg',
$tip$1. Settings, Bluetooth, turn it on. Put the earbuds in pairing mode and click them in the list.
2. Not showing? Terminal:
bluetoothctl
power on
scan on
(wait for your device and its address, like AA:BB:CC:11:22:33)
pair AA:BB:CC:11:22:33
connect AA:BB:CC:11:22:33
trust AA:BB:CC:11:22:33
exit
3. Connected but no sound: choose the earbuds as output in Sound settings.
4. Bluetooth won't turn on: rfkill unblock bluetooth, then sudo systemctl restart bluetooth.$tip$,
ARRAY['Bluetooth settings', 'bluetoothctl'], now() - interval '1425 minutes'),

('software-tip-linux-appimage', 'SOFTWARE', 'Run AppImage Programs on Linux', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-appimage.jpg',
$tip$An AppImage is a single file that runs a program without installing it.

1. Download the .AppImage only from the program's official website.
2. Make it runnable: right-click, Properties, Permissions, "Allow executing file as program". Or: chmod +x name.AppImage
3. Double-click it, or run ./name.AppImage in Terminal.
4. Error about FUSE on newer Ubuntu: sudo apt install libfuse2t64 (Ubuntu 24.04) or libfuse2 (22.04).
5. Keep AppImages in one folder like ~/Applications. Gear Lever (Flathub) can add them to the app menu.

AppImages don't update automatically. Download the new version when needed.$tip$,
ARRAY['AppImage', 'chmod'], now() - interval '1426 minutes'),

('software-tip-linux-steam-gaming', 'SOFTWARE', 'Play Windows Games on Linux with Steam and Proton', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-steam-gaming.jpg',
$tip$1. Install the graphics driver first (see our Linux drivers tip), especially for NVIDIA cards.
2. Install Steam from App Center or Software Manager (or sudo apt install steam).
3. In Steam: Settings, Compatibility, turn on "Enable Steam Play for all other titles" (Proton).
4. Install and play many Windows games as normal.
5. Check protondb.com before buying to see how well a game runs.

Games with strict anti-cheat (some online shooters) may not work. Single-player games usually do well.$tip$,
ARRAY['Steam', 'Proton'], now() - interval '1427 minutes')
ON CONFLICT ("id") DO NOTHING;
