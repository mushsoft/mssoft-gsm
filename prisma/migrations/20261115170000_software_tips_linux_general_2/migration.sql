-- One-time content load (no schema change): 10 more Linux tips and 15 general
-- phone and computer tips, each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-linux-timeshift', 'SOFTWARE', 'Back Up Your Linux System with Timeshift', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-timeshift.jpg',
$tip$Timeshift takes snapshots of the system so you can undo a bad update, like System Restore on Windows.

1. Linux Mint has it built in. Ubuntu: sudo apt install timeshift
2. Open Timeshift, choose RSYNC, and pick a drive with free space (an external drive is safest).
3. Set a schedule, for example daily, keep 5, and weekly, keep 3.
4. Click Create for a snapshot now, especially before big updates.
5. Restore: open Timeshift, pick a snapshot, Restore. If the system won't start, boot a live USB, install Timeshift there and restore.

By default it doesn't back up your Home folder (documents and photos). Back those up separately (see our rsync tip).$tip$,
ARRAY['Timeshift'], now() - interval '800 minutes'),

('software-tip-linux-run-windows-apps', 'SOFTWARE', 'Run Windows Programs on Linux with Wine and Bottles', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-run-windows-apps.jpg',
$tip$1. First look for a Linux version or a free alternative: LibreOffice for Office, GIMP for Photoshop, VLC for media.
2. Bottles is the easiest way to run Windows programs: install it from the app store (Flatpak) or flathub.org.
3. Create a new bottle (Application), then click "Run Executable" and choose the program's .exe installer.
4. Or install Wine directly: sudo apt install wine, then right-click the .exe and open with Wine.
5. Check winehq.org (AppDB) to see how well a program works before you try.

Many simple programs work well. Drivers, flashing tools that need special USB drivers, and games with anti-cheat usually don't. Keep a Windows PC or dual boot for those.$tip$,
ARRAY['Bottles', 'Wine'], now() - interval '801 minutes'),

('software-tip-linux-libreoffice', 'SOFTWARE', 'LibreOffice: Free Office for Linux (and Windows)', 'Linux', 'All Linux, Windows', NULL, '/tips/linux-libreoffice.jpg',
$tip$LibreOffice comes with Ubuntu and Linux Mint. It's also free for Windows from libreoffice.org.

Writer: like Word. Calc: like Excel. Impress: like PowerPoint.

1. It opens .docx, .xlsx and .pptx files.
2. Sending to Word users? File, Save As, and choose "Word 2007-365 (.docx)". Click "Use Word Format" when asked.
3. Set Microsoft formats as default: Tools, Options, Load/Save, General, "Always save as".
4. Export to PDF: File, Export as PDF.
5. Documents look different? Install the common Windows fonts: sudo apt install ttf-mscorefonts-installer

Choose View, User Interface, Tabbed if you prefer a ribbon like Office.$tip$,
ARRAY['LibreOffice'], now() - interval '802 minutes'),

('software-tip-linux-printer', 'SOFTWARE', 'Set Up a Printer on Linux', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-printer.jpg',
$tip$1. Connect the printer by USB or to the same Wi-Fi, and turn it on.
2. Ubuntu: Settings, Printers. Linux Mint: Menu, Printers. Many printers appear automatically. Click Add.
3. Print a test page.
4. HP printers: install the HP tools for full support: sudo apt install hplip-gui, then open HPLIP Toolbox.
5. Other brands not working: search the printer model on openprinting.org, or the maker's site for a Linux driver (Epson and Brother offer .deb packages).
6. Scanner: open the Document Scanner app.

Network printers often work best when given a fixed IP address on the router.$tip$,
ARRAY['Printers settings', 'HPLIP'], now() - interval '803 minutes'),

('software-tip-linux-keyboard-shortcuts', 'SOFTWARE', 'Useful Keyboard Shortcuts on Ubuntu and Linux Mint', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-keyboard-shortcuts.jpg',
$tip$Super is the key with the Windows logo.

Super: open Activities (Ubuntu) or the Menu (Mint) and start typing an app name
Ctrl, Alt and T: open Terminal
Super and L: lock the screen
Alt and Tab: switch apps
Alt and F4: close a window
Super and Left or Right arrow: snap a window to half the screen
Super and Up arrow: maximise
Print Screen: screenshot (Ubuntu opens a tool for area, window or screen)
Ctrl and H in the Files app: show hidden files
Ctrl and L in the Files app: type a folder path

Change or add your own: Settings, Keyboard, Keyboard Shortcuts.$tip$,
ARRAY['Keyboard'], now() - interval '804 minutes'),

('software-tip-linux-systemctl', 'SOFTWARE', 'Start, Stop and Check Services with systemctl', 'Linux', 'All modern Linux', NULL, '/tips/linux-systemctl.jpg',
$tip$Services are programs that run in the background (network, printing, SSH, web servers).

systemctl status ssh: is it running? Any recent errors?
sudo systemctl start ssh: start it
sudo systemctl stop ssh: stop it
sudo systemctl restart ssh: restart it after changing settings
sudo systemctl enable ssh: start automatically at boot
sudo systemctl disable ssh: don't start at boot
systemctl --failed: list services that failed

Replace ssh with the service name, for example NetworkManager, cups (printing) or bluetooth. Press Q to leave the status view.$tip$,
ARRAY['systemctl', 'Terminal'], now() - interval '805 minutes'),

('software-tip-linux-logs', 'SOFTWARE', 'Read Linux System Logs to Find Problems', 'Linux', 'All modern Linux', NULL, '/tips/linux-logs.jpg',
$tip$1. Errors since this boot: journalctl -b -p err
2. Errors from the previous boot (useful after a crash): journalctl -b -1 -p err
3. One service: journalctl -u NetworkManager -b
4. Follow live, like a monitor: journalctl -f (Ctrl and C to stop)
5. Hardware and driver messages: sudo dmesg | tail -50
6. Graphical: open the Logs app (GNOME Logs) on Ubuntu.

Copy the exact error line into a search engine. Someone has usually solved it already. Press Q to leave journalctl, and the arrow keys or Page Down to scroll.$tip$,
ARRAY['journalctl', 'dmesg'], now() - interval '806 minutes'),

('software-tip-linux-swap', 'SOFTWARE', 'Add Swap Space to a Low-RAM Linux PC', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-swap.jpg',
$tip$Swap is disk space used when RAM is full. It stops freezes on PCs with 2 to 4 GB of RAM.

1. Check current swap: swapon --show and free -h
2. Create a 4 GB swap file:
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
3. Keep it after restart: sudo nano /etc/fstab and add this line at the end:
/swapfile none swap sw 0 0
4. Check again with free -h.

Ubuntu already creates a swap file during install. If /swapfile already exists, resize it instead of making a second one. Swap on an old hard disk is slow: adding RAM or an SSD helps far more.$tip$,
ARRAY['Terminal', 'fallocate', 'swapon'], now() - interval '807 minutes'),

('software-tip-linux-rsync', 'SOFTWARE', 'Back Up Folders on Linux with rsync', 'Linux', 'All Linux', NULL, '/tips/linux-rsync.jpg',
$tip$rsync copies folders and, next time, only copies what changed. Fast for regular backups.

1. Plug in the backup drive. It appears under /media/yourname/DriveName.
2. Copy Documents to it:
rsync -av --progress ~/Documents/ /media/yourname/Backup/Documents/
3. Run the same command again later. Only new and changed files are copied.
4. The ending slash matters: ~/Documents/ copies what's inside, ~/Documents copies the folder itself.
5. Test first with -n (dry run): rsync -avn ~/Documents/ /media/yourname/Backup/Documents/

Avoid --delete until you understand it. It removes files from the backup that you deleted on the PC. Grsync is a graphical version (sudo apt install grsync).$tip$,
ARRAY['rsync', 'External drive'], now() - interval '808 minutes'),

('software-tip-linux-screenshot-recording', 'SOFTWARE', 'Take Screenshots and Record the Screen on Ubuntu and Linux Mint', 'Linux', 'Ubuntu, Linux Mint', NULL, '/tips/linux-screenshot-recording.jpg',
$tip$Ubuntu (22.04 and newer):
1. Press Print Screen. A tool appears: choose Selection, Screen or Window, then capture.
2. Switch the tool to video (camera icon) to record the screen. Click the stop button in the top bar to finish.
3. Screenshots go to Pictures, Screenshots. Recordings go to Videos, Screencasts.

Linux Mint:
1. Print Screen opens the Screenshot app. Shift and Print Screen captures an area.
2. For recording, install SimpleScreenRecorder or OBS Studio from Software Manager.

The built-in Ubuntu recorder doesn't capture sound. Use OBS Studio for recordings with audio.$tip$,
ARRAY['Screenshot tool', 'OBS Studio'], now() - interval '809 minutes'),

('software-tip-phone-water-damage', 'SOFTWARE', 'Phone Fell in Water? What to Do (and What Not to Do)', 'All brands', 'All phones', NULL, '/tips/phone-water-damage.jpg',
$tip$Do:
1. Take it out fast and turn it off. Don't wait to see if it still works.
2. Remove the case, SIM tray and memory card.
3. Wipe it dry and shake gently with the ports facing down.
4. Bring it to a technician quickly. Opening and cleaning the board early stops corrosion, which is what really kills phones.

Don't:
Charge it or plug it into a computer.
Use a hair dryer or put it in the sun or oven. Heat damages the battery and screen.
Rely on rice. It doesn't pull water out of the inside, and only wastes time.
Keep pressing buttons to test it.

"Water resistant" phones are not waterproof, especially after a drop or a screen repair. Salt water and sugary drinks are the worst.$tip$,
ARRAY['Dry cloth', 'Technician'], now() - interval '810 minutes'),

('software-tip-cracked-screen-safety', 'SOFTWARE', 'Cracked Phone Screen: Protect Your Data and Your Fingers', 'All brands', 'All phones', NULL, '/tips/cracked-screen-safety.jpg',
$tip$1. Back up now. Cracks spread, and the touch or display can stop working any day (see our backup tips).
2. Put clear tape or a cheap screen protector over the glass to stop splinters.
3. Black spots, lines or green flicker on an AMOLED screen spread over time. Repair soon.
4. Touch working by itself (ghost touch)? Lock the screen quickly when not using it. Ghost touches can call people or type random things.
5. Know your options: original screens look and last best. Cheaper copy (incell) screens work but may be dimmer and use more battery.
6. Waterproofing is gone after a crack.

Note your screen lock PIN for the technician, or remove it before the repair, so the screen can be tested properly.$tip$,
ARRAY['Screen protector', 'Backup'], now() - interval '811 minutes'),

('software-tip-buying-used-phone', 'SOFTWARE', 'Checks to Do Before Buying a Used Phone', 'All brands', 'iPhone, Android', NULL, '/tips/buying-used-phone.jpg',
$tip$1. Dial *#06# and check the IMEI matches the box and the phone's settings.
2. iPhone: Settings, General, About should show no "Unknown Part" messages, and the seller must sign out of Apple ID (Find My off). Android: the phone must not ask for the previous Google account after reset.
3. Battery health: iPhone Settings, Battery. Samsung: Samsung Members diagnostics (see our tips).
4. Test: calls with your SIM, mobile data, Wi-Fi, both cameras, speaker, mic, charging, fingerprint or Face ID, buttons.
5. Check the screen at full white and full black for marks, lines and burn-in.
6. Ask for a receipt with the seller's name, ID number and the IMEI.

Prices far below market are often stolen or locked phones. Walk away from a seller who won't reset the phone in front of you.$tip$,
ARRAY['*#06#', 'Your SIM card'], now() - interval '812 minutes'),

('software-tip-phone-imei', 'SOFTWARE', 'Find Your Phone''s IMEI and Keep It Safe', 'All brands', 'All phones', NULL, '/tips/phone-imei.jpg',
$tip$The IMEI is your phone's unique serial number. You need it if the phone is lost or stolen.

How to find it:
1. Dial *#06# (works on almost all phones).
2. Settings, About phone (iPhone: Settings, General, About).
3. On the box sticker, and on some SIM trays.
4. Dual SIM phones have two IMEIs. Save both.

Keep a photo of the box sticker and write the IMEI somewhere safe (email it to yourself).
If stolen: report to the police and your network with the IMEI. Use Find My Device or Find My to locate or erase it.

Never post your IMEI publicly online. Scammers can use it to make fake documents for a stolen phone.$tip$,
ARRAY['*#06#'], now() - interval '813 minutes'),

('software-tip-strong-passwords', 'SOFTWARE', 'Make Strong Passwords You Can Actually Remember', 'All brands', 'All devices', NULL, '/tips/strong-passwords.jpg',
$tip$1. Use a passphrase: 3 or 4 random words plus a number, for example "Mango-River-Taxi-47". Long beats complicated.
2. Never reuse your email password anywhere else. If one website is hacked, criminals try that password on your email.
3. Avoid names, birthdays, phone numbers and "123456" or "password".
4. Let a password manager remember them: Google Password Manager, iCloud Keychain or Bitwarden (see our password manager tip).
5. Turn on two-step verification for email, WhatsApp and banking (see our 2-step tips).
6. Change passwords that may have leaked, and check passwords.google.com for warnings.

Nobody genuine will ask for your password or one-time code. Not your bank, not mobile money, not us.$tip$,
ARRAY['Password manager'], now() - interval '814 minutes'),

('software-tip-public-wifi-safety', 'SOFTWARE', 'Stay Safe on Public Wi-Fi', 'All brands', 'Phones and laptops', NULL, '/tips/public-wifi-safety.jpg',
$tip$1. Check the exact network name with staff. Criminals create fake networks with similar names ("Cafe_Free_WiFi").
2. Avoid banking and mobile money on public Wi-Fi. Use mobile data for those.
3. Only enter passwords on websites with https and the lock icon.
4. Turn off file sharing and set the network as Public on laptops (Windows asks when you connect).
5. Forget the network when you leave, and turn off auto-join for open networks.
6. A trusted VPN app adds protection. Avoid unknown free VPNs, which may sell your data.

Charging at public USB ports? Use your own plug charger or a power bank instead.$tip$,
ARRAY['Wi-Fi settings', 'VPN'], now() - interval '815 minutes'),

('software-tip-spot-phishing', 'SOFTWARE', 'Spot Fake Links and Phishing Messages', 'All brands', 'All devices', NULL, '/tips/spot-phishing.jpg',
$tip$Warning signs:
1. Urgency or fear: "Your account will be closed today", "You've won, claim now".
2. Links that look almost right: g00gle.com, mtn-promo.xyz, or shortened links.
3. Requests for PINs, passwords, or one-time codes.
4. Messages from unknown numbers pretending to be a bank, mobile money, a delivery company, or a friend with a "new number".
5. Spelling mistakes and strange greetings.

What to do:
Don't tap the link. Open the app yourself, or type the official website address.
Call the company on the number printed on your card or their official website.
Delete and report the message, and block the sender.

Clicked one already? Change your password now and turn on two-step verification.$tip$,
ARRAY['Common sense'], now() - interval '816 minutes'),

('software-tip-sim-swap-protection', 'SOFTWARE', 'Protect Your Number from SIM Swap Fraud', 'All brands', 'All phones', NULL, '/tips/sim-swap-protection.jpg',
$tip$In SIM swap fraud, a criminal gets a new SIM for your number, then receives your codes and mobile money messages.

1. Never share your mobile money PIN, one-time codes or ID details on calls or messages.
2. Set a SIM PIN (see our SIM PIN tip).
3. Make sure your SIM is registered in your own name with your own ID.
4. Phone suddenly shows "No service" or "SIM not provisioned" in an area with good signal? Call your network from another phone straight away.
5. Use app-based or email two-step verification where possible, not only SMS.
6. Keep your mobile money balance low and use a strong PIN, not your birth year.

Act fast: the first hour matters most.$tip$,
ARRAY['SIM PIN', '2-step verification'], now() - interval '817 minutes'),

('software-tip-kids-online-safety', 'SOFTWARE', 'Keep Children Safe Online', 'All brands', 'All devices', NULL, '/tips/kids-online-safety.jpg',
$tip$1. Use YouTube Kids instead of YouTube for young children, and set the age level.
2. Turn on Google SafeSearch (Google app settings) and approval for downloads (Family Link on Android, Ask to Buy on iPhone).
3. Set time limits and bedtime with Family Link or Screen Time (see our tips).
4. Keep devices in shared rooms, not in bedrooms at night.
5. Check the age rating of games and apps before installing.
6. Talk to them: they should tell you about strangers who message them, requests for photos, or anything that makes them uncomfortable, without fear of losing the phone.
7. Lock in-app purchases and don't save payment details on their device.$tip$,
ARRAY['YouTube Kids', 'Family Link', 'Screen Time'], now() - interval '818 minutes'),

('software-tip-eye-strain', 'SOFTWARE', 'Reduce Eye Strain from Phones and Computers', 'All brands', 'All devices', NULL, '/tips/eye-strain.jpg',
$tip$1. Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet (6 metres) away for 20 seconds.
2. Match screen brightness to the room. A bright screen in a dark room tires your eyes.
3. Turn on Night Light (Windows), Night Shift (iPhone) or Eye comfort shield (Samsung) in the evening.
4. Make text bigger instead of bringing the screen closer (see our text size tips).
5. Keep a computer screen about an arm's length away, slightly below eye level.
6. Blink often. We blink less while staring at screens.
7. Clean the screen. Smudges make you strain to read.

Headaches or blurry vision that don't go away? See an eye doctor.$tip$,
ARRAY['Night Light', 'Eye comfort'], now() - interval '819 minutes'),

('software-tip-clean-devices', 'SOFTWARE', 'Clean Your Phone and Laptop Safely', 'All brands', 'Phones and laptops', NULL, '/tips/clean-devices.jpg',
$tip$1. Turn the device off and unplug it.
2. Use a soft microfibre cloth. Slightly damp with water is enough for most dirt.
3. For germs, put a little 70% isopropyl alcohol on the cloth, never directly on the device.
4. Ports: use a dry soft brush or a wooden toothpick gently. Never use metal pins in the charging port.
5. Keyboards: turn upside down and tap, then use a soft brush or air blower.
6. Avoid window cleaner, vinegar, bleach and kitchen sprays on screens. They remove the coating.
7. Let it dry completely before turning on.

Laptop fan loud and dusty inside? Internal cleaning needs opening the case. Bring it in (see our overheating tip).$tip$,
ARRAY['Microfibre cloth', 'Isopropyl alcohol'], now() - interval '820 minutes'),

('software-tip-laptop-buying-guide', 'SOFTWARE', 'What to Look For When Buying a Laptop', 'All brands', 'Laptops', NULL, '/tips/laptop-buying-guide.jpg',
$tip$1. Storage: an SSD, not a hard disk. 256 GB minimum, 512 GB better.
2. RAM: 8 GB minimum for Windows 11. 16 GB for design, video or many browser tabs.
3. Processor: newer is better. Intel Core i5 or AMD Ryzen 5 from the last few generations suit most people. Avoid very old or Celeron chips for heavy work.
4. Screen: Full HD (1920 x 1080), IPS for good colours and angles.
5. Battery: check the real battery life in reviews. For used laptops, run a battery report (see our tip).
6. Ports: USB-C charging, HDMI and enough USB ports for your needs.
7. Genuine Windows, warranty and a receipt.

Buying used or refurbished? Check hinges, keyboard, screen, charging port and the drive health before paying.$tip$,
ARRAY['Battery report', 'Drive health check'], now() - interval '821 minutes'),

('software-tip-ram-vs-storage', 'SOFTWARE', 'RAM vs Storage: What the Numbers Mean', 'All brands', 'Phones and computers', NULL, '/tips/ram-vs-storage.jpg',
$tip$A phone sold as "4/128" or "8 GB + 256 GB" has two kinds of memory.

RAM (the first, smaller number): working memory for open apps. More RAM keeps more apps open without reloading. 4 GB is basic, 6 to 8 GB is comfortable on Android, 8 to 16 GB on laptops.

Storage (the bigger number): where apps, photos, videos and files are kept. "Storage full" means this one. 64 GB fills fast with WhatsApp and videos. 128 GB or more is better.

"Extended RAM" or "virtual RAM" uses storage as extra RAM. It helps a little, but it's slower than real RAM.

You can usually add a memory card for more storage on Android, but you can't add RAM to a phone.$tip$,
ARRAY['Settings, About phone'], now() - interval '822 minutes'),

('software-tip-ssd-upgrade', 'SOFTWARE', 'Upgrade to an SSD: The Best Speed Boost for an Old Laptop', 'All brands', 'Laptops and desktops', NULL, '/tips/ssd-upgrade.jpg',
$tip$A slow laptop with a hard disk (HDD) can start in seconds instead of minutes with an SSD.

1. Check the slot: most older laptops take a 2.5 inch SATA SSD. Newer ones take M.2 (SATA or NVMe). Check the laptop model's specs before buying.
2. Back up your files.
3. Choose: clone the old disk to the SSD with cloning software, or do a fresh Windows install (cleaner and often faster, see our clean install tip).
4. After installing, check Optimise Drives shows "Solid state drive" (see our optimise tip).
5. Keep the old disk as an external drive with a cheap USB case.

Many 4 to 8 year old laptops feel almost new after an SSD plus 8 GB RAM. We can fit and set it up for you.$tip$,
ARRAY['SSD', 'Screwdriver', 'Cloning software'], now() - interval '823 minutes'),

('software-tip-power-surge-protection', 'SOFTWARE', 'Protect Your Electronics from Power Surges and Power Cuts', 'All brands', 'All devices', NULL, '/tips/power-surge-protection.jpg',
$tip$1. Use a surge protector extension (not just a plain multi-plug) for TVs, PCs and routers.
2. For desktop PCs, a UPS gives a few minutes to save work and shut down properly when power goes off.
3. Areas with low or unstable voltage: a voltage stabiliser (AVR) protects fridges, TVs and PCs.
4. Unplug devices during thunderstorms, including the router's phone or cable line.
5. When power returns after a cut, wait a minute before turning everything on. The first seconds are often unstable.
6. Use original or good quality chargers. Cheap ones pass surges straight to the phone.
7. Keep a charged power bank for phones during power cuts.

Generator power can be rough. Let it run for a minute before connecting electronics.$tip$,
ARRAY['Surge protector', 'UPS', 'Stabiliser'], now() - interval '824 minutes')
ON CONFLICT ("id") DO NOTHING;
