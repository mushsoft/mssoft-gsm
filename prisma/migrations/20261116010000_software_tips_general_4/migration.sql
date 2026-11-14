-- One-time content load (no schema change): 37 general tips (home and power
-- tech, accessories, photos, wellbeing, accounts), each with its own photo
-- from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('software-tip-cctv-phone-viewing', 'SOFTWARE', 'Watch Your CCTV Cameras on Your Phone', 'All brands', 'CCTV DVR and NVR systems', NULL, '/tips/cctv-phone-viewing.jpg',
$tip$1. Find the app for your recorder's brand (written on the DVR or in its menu), for example Hik-Connect, DMSS, XMEye or the brand's own app.
2. Connect the DVR or NVR to your router with a network cable.
3. In the DVR menu, turn on the cloud (P2P) service and find its QR code.
4. In the phone app, add a device by scanning that QR code, then enter the device password.
5. Choose "sub stream" or standard quality on mobile data to save bundles.
6. Turn on motion alerts for the cameras that matter (entrance, cash counter).

Change the default password first (see our CCTV password tip).$tip$,
ARRAY['CCTV app', 'Router'], now() - interval '1500 minutes'),

('software-tip-cctv-security', 'SOFTWARE', 'Secure Your CCTV Recorder: Passwords and Updates', 'All brands', 'CCTV DVR and NVR systems', NULL, '/tips/cctv-security.jpg',
$tip$Many DVRs are hacked because they still use the installer's default password.

1. Change the admin password on the DVR to a strong one only you know. Write it down safely.
2. Create a separate viewing user (live view only) for staff.
3. Update the firmware from the brand's official website or app.
4. Don't open router ports for the DVR unless your installer sets it up securely. The brand's cloud app is safer.
5. Set the correct date and time so recordings are useful as evidence.
6. Check recordings are actually saving: play back yesterday's footage now and then.$tip$,
ARRAY['DVR menu', 'CCTV app'], now() - interval '1501 minutes'),

('software-tip-cctv-placement', 'SOFTWARE', 'Where to Place CCTV Cameras at a Shop or Home', 'All brands', 'CCTV systems', NULL, '/tips/cctv-placement.jpg',
$tip$1. Cover entrances, the cash counter, the stock room and the gate.
2. Mount about 2.5 to 3 metres high, out of easy reach, angled down to see faces.
3. Don't point cameras at the sun or bright lights. They show only dark shapes.
4. At night, glass windows reflect the camera's infrared light. Put cameras outside the glass or use colour night cameras.
5. Respect privacy: don't point cameras into neighbours' homes, toilets or changing rooms.
6. Recording days depend on the hard drive size and number of cameras. Ask for at least 2 weeks of storage.

Put a sign saying CCTV is in use. It also deters theft.$tip$,
ARRAY['CCTV cameras'], now() - interval '1502 minutes'),

('software-tip-home-wifi-camera-privacy', 'SOFTWARE', 'Wi-Fi Home Cameras: Keep Them Private and Secure', 'All brands', 'Wi-Fi security cameras', NULL, '/tips/home-wifi-camera-privacy.jpg',
$tip$1. Buy known brands with regular updates. Very cheap no-name cameras often have weak security.
2. Set a strong password for the camera app and turn on two-step verification.
3. Update the camera firmware in the app.
4. Use privacy mode or turn the camera away when you're at home, especially in bedrooms.
5. Use a 2.4 GHz Wi-Fi network with a strong password (most cameras need 2.4 GHz).
6. Review who has access (shared users) in the app and remove old ones.

Cloud recording subscriptions are optional. A memory card in the camera works for basic recording.$tip$,
ARRAY['Camera app'], now() - interval '1503 minutes'),

('software-tip-solar-for-electronics', 'SOFTWARE', 'Solar Power for Phones, Laptops and TVs: The Basics', 'All brands', 'Home and shop solar', NULL, '/tips/solar-for-electronics.jpg',
$tip$A solar system for electronics has four parts:
1. Panels: make power in daylight.
2. Charge controller: protects the battery. MPPT controllers are more efficient than PWM.
3. Battery: stores power for the night. Lithium (LiFePO4) lasts much longer than lead-acid.
4. Inverter: changes battery power to normal mains power. Choose "pure sine wave" for laptops, TVs and printers.

Add up the watts of what you'll run and for how many hours (see our inverter sizing tip).

Have it installed by a qualified technician. Bad wiring and cheap fuses cause fires.$tip$,
ARRAY['Solar panel', 'Charge controller', 'Inverter'], now() - interval '1504 minutes'),

('software-tip-solar-phone-charging', 'SOFTWARE', 'Charging Phones with a Small Solar Panel', 'All brands', 'Portable solar chargers', NULL, '/tips/solar-phone-charging.jpg',
$tip$1. Put the panel in direct sun, facing the sun. Clouds and shade cut power a lot.
2. Charge a power bank from the panel during the day, then charge the phone from the power bank. This is steadier than charging the phone directly.
3. Cheap panels often claim more watts than they deliver. A real 20 W panel is a good minimum for phones.
4. Keep the phone itself in the shade. Heat damages batteries.
5. Clean dust off the panel regularly.

Solar lanterns with USB ports are also handy for charging phones during power cuts.$tip$,
ARRAY['Solar panel', 'Power bank'], now() - interval '1505 minutes'),

('software-tip-inverter-ups-sizing', 'SOFTWARE', 'What Size UPS or Inverter Do You Need?', 'All brands', 'UPS and inverters', NULL, '/tips/inverter-ups-sizing.jpg',
$tip$1. Add up the watts (W) of everything you'll plug in. Check labels: a laptop charger about 65 W, a desktop PC with monitor 150 to 300 W, a router 10 W, a TV 50 to 150 W.
2. Add about 25% extra.
3. UPS and inverters are often rated in VA. Real watts are lower, usually 60 to 80% of the VA (a 1000 VA unit gives about 600 to 800 W).
4. Running time: battery volts x amp hours x 0.8, divided by your load in watts. Example: 12 V x 100 Ah x 0.8 = 960 Wh. With a 100 W load, about 9 hours.
5. Choose pure sine wave for computers and TVs.

Never plug kettles, irons or heaters into a small UPS.$tip$,
ARRAY['UPS', 'Inverter'], now() - interval '1506 minutes'),

('software-tip-extension-cable-safety', 'SOFTWARE', 'Extension Cables and Multi-Plugs: Avoid Fires and Damage', 'All brands', 'All electronics', NULL, '/tips/extension-cable-safety.jpg',
$tip$1. Don't plug heaters, kettles, irons or cookers into multi-plugs. They draw too much power.
2. Never plug one extension into another (daisy chain).
3. Check for warm plugs, a burning smell, melted plastic or loose sockets. Replace them straight away.
4. Buy good quality extensions with proper earth and a fuse or breaker. Very light, cheap ones use thin wire.
5. Keep them away from water and don't run them under carpets.
6. Unplug chargers when not in use.

Use a surge protector for computers and TVs (see our power surge tip).$tip$,
ARRAY['Surge protector'], now() - interval '1507 minutes'),

('software-tip-smart-plugs', 'SOFTWARE', 'Smart Plugs: Control and Schedule Devices from Your Phone', 'All brands', 'Wi-Fi smart plugs', NULL, '/tips/smart-plugs.jpg',
$tip$1. Plug it in and install its app (the brand's own, or one like Smart Life or Tapo).
2. Connect it to your 2.4 GHz Wi-Fi from the app.
3. Turn devices on and off from anywhere, or set schedules: a water heater for 30 minutes in the morning, shop lights at night.
4. Some show energy use, helpful for finding power-hungry devices.
5. Use voice control with Google Assistant or Alexa if you have them.

Check the plug's maximum load (for example 10 A or 16 A). Never use it for anything above that rating.$tip$,
ARRAY['Smart plug app'], now() - interval '1508 minutes'),

('software-tip-projector-buying-setup', 'SOFTWARE', 'Buying and Setting Up a Projector', 'All brands', 'Projectors', NULL, '/tips/projector-buying-setup.jpg',
$tip$Buying:
1. Native resolution matters. Many cheap projectors say "supports 4K" or "1080p supported" but show only 480p or 720p. Look for native 1080p.
2. Brightness: real ANSI lumens. Cheap ones often exaggerate. More lumens are needed for rooms that aren't dark.
3. Check inputs: HDMI, USB, and built-in Wi-Fi casting if you want it.

Setting up:
1. Use a white wall or a projector screen, in a darkened room.
2. Move the projector to get the size you want, then adjust focus.
3. Use lens shift or keystone to straighten the picture (too much keystone softens it).
4. Use an external speaker for better sound.$tip$,
ARRAY['Projector', 'HDMI cable'], now() - interval '1509 minutes'),

('software-tip-projector-phone-connect', 'SOFTWARE', 'Connect a Phone or Laptop to a Projector', 'All brands', 'Projectors', NULL, '/tips/projector-phone-connect.jpg',
$tip$Laptop: HDMI cable, choose the HDMI input on the projector, then Windows key and P to Duplicate (see our TV and projector tip).

Phone with a cable:
Android with USB-C video output (many Samsung S series and others): USB-C to HDMI adapter.
iPhone with Lightning: Apple Lightning Digital AV Adapter. iPhone 15 and newer: USB-C to HDMI.

Wireless: many projectors have screen mirroring (Miracast for Android, AirPlay on some models). Or plug in a streaming stick (Chromecast, Fire TV).

Netflix and some video apps block mirroring and show a black screen. Use the projector's own app or a streaming stick instead.$tip$,
ARRAY['HDMI adapter', 'Screen mirroring'], now() - interval '1510 minutes'),

('software-tip-webcam-better-video', 'SOFTWARE', 'Look Better on Video Calls with Your Webcam', 'All brands', 'Laptops and desktops', NULL, '/tips/webcam-better-video.jpg',
$tip$1. Light in front of you: face a window or put a lamp behind the screen. Light behind you makes your face dark.
2. Camera at eye level: raise the laptop on books.
3. Wipe the webcam lens. Laptop cameras get greasy fingerprints.
4. A plain, tidy background, or use background blur in Zoom, Teams or Meet.
5. An external 1080p webcam looks much better than most built-in laptop cameras.
6. Windows 11: Settings, Bluetooth and devices, Cameras, choose your camera to adjust brightness and contrast.

Good sound matters more than video: use earphones with a mic.$tip$,
ARRAY['Webcam', 'Camera settings'], now() - interval '1511 minutes'),

('software-tip-phone-as-webcam', 'SOFTWARE', 'Use Your Phone as a Webcam for Your Computer', 'All brands', 'Android, iPhone', NULL, '/tips/phone-as-webcam.jpg',
$tip$A phone camera is usually much better than a laptop webcam.

1. Android with Windows 11: link the phone with Phone Link (see our tip), then in Settings, Bluetooth and devices, Mobile devices, turn on "Use as a connected camera". Choose it in Zoom or Teams.
2. iPhone with a Mac: Continuity Camera works automatically in FaceTime, Zoom and others.
3. Other setups: apps like DroidCam or Camo (phone app plus computer program) work over Wi-Fi or USB.
4. Use the phone's rear camera for the best quality.
5. Put the phone on a small stand or tripod at eye level, and keep it on charge.$tip$,
ARRAY['Phone Link', 'Phone stand'], now() - interval '1512 minutes'),

('software-tip-car-phone-safety', 'SOFTWARE', 'Using Your Phone in the Car Safely', 'All brands', 'Android, iPhone', NULL, '/tips/car-phone-safety.jpg',
$tip$1. Never hold the phone or type messages while driving. It's dangerous and against traffic rules.
2. Use a mount on the dashboard or air vent where it doesn't block your view or the airbags.
3. Set the destination in Google Maps before you start moving.
4. Use voice: "Hey Google, call..." or Siri, and a Bluetooth car kit or earpiece for calls.
5. Turn on driving focus: iPhone Driving Focus, Android Driving mode (Samsung Modes, Driving) to silence messages.
6. Don't leave the phone on the dashboard in the sun when parked. Heat damages batteries.$tip$,
ARRAY['Phone mount', 'Voice assistant'], now() - interval '1513 minutes'),

('software-tip-android-auto-carplay', 'SOFTWARE', 'Android Auto and Apple CarPlay: Your Phone on the Car Screen', 'All brands', 'Android, iPhone', NULL, '/tips/android-auto-carplay.jpg',
$tip$1. Check your car radio or screen supports Android Auto or CarPlay. Many aftermarket screens do too.
2. Connect the phone with a good USB cable (or wirelessly if the car supports it).
3. Android: follow the Android Auto prompts on the phone. iPhone: allow CarPlay when asked (Settings, General, CarPlay).
4. Use Google Maps or Waze, music, calls and messages read aloud, all from the car's screen and voice control.
5. Disconnects often? Try another cable. Cheap cables are the most common cause.

Some cheap car screens use "mirror link" apps instead. Those are less reliable than real Android Auto or CarPlay.$tip$,
ARRAY['Android Auto', 'CarPlay', 'USB cable'], now() - interval '1514 minutes'),

('software-tip-product-photos-selling', 'SOFTWARE', 'Take Great Product Photos with Your Phone for Selling Online', 'All brands', 'Android, iPhone', NULL, '/tips/product-photos-selling.jpg',
$tip$1. Use daylight from a window. Avoid harsh direct sun and yellow room lights.
2. Plain background: white paper or a clean wall. Remove clutter.
3. Clean the product (and your phone lens) first. Dust shows clearly in photos.
4. Take several angles: front, back, sides, close-ups of details, and the box and accessories.
5. Show any scratches or faults honestly. It builds trust and avoids returns.
6. Shoot at 1x, not zoomed, and tap to focus on the product.
7. Square photos work well on WhatsApp catalogs and marketplaces.

Background removal tools (see our Paint tip) make clean white backgrounds easy.$tip$,
ARRAY['Phone camera', 'Plain background'], now() - interval '1515 minutes'),

('software-tip-phone-photo-basics', 'SOFTWARE', 'Phone Photography Basics for Sharper, Brighter Photos', 'All brands', 'Android, iPhone', NULL, '/tips/phone-photo-basics.jpg',
$tip$1. Wipe the lens with a soft cloth before shooting.
2. Tap the subject on the screen to focus, then slide the brightness up or down.
3. Turn on the grid and keep horizons straight.
4. Hold the phone with two hands and press gently. Use the volume button as a shutter.
5. Avoid digital zoom. Move closer, or use the phone's dedicated zoom lens (2x, 3x).
6. HDR on (or Auto) for bright skies.
7. Burst: hold the shutter (or swipe it) for moving subjects and pick the best shot.

Back up your photos (see our Google Photos and iCloud tips).$tip$,
ARRAY['Camera'], now() - interval '1516 minutes'),

('software-tip-game-controller-phone', 'SOFTWARE', 'Connect a PlayStation or Xbox Controller to Your Phone', 'All brands', 'Android, iPhone', NULL, '/tips/game-controller-phone.jpg',
$tip$1. PlayStation (DualShock 4 or DualSense): hold the Share (or Create) button and the PS button until the light flashes.
2. Xbox controller: turn it on, then hold the small pairing button on top until the Xbox logo flashes fast.
3. On the phone, open Bluetooth and choose the controller.
4. Open a game that supports controllers. Many popular games do.
5. A phone clip holds the phone on the controller.
6. To pair back with the console, connect the controller to the console with a USB cable.

Generic Bluetooth gamepads may need a mode switch (often holding a button while turning on). Check the manual.$tip$,
ARRAY['Bluetooth', 'Game controller'], now() - interval '1517 minutes'),

('software-tip-phone-gaming-performance', 'SOFTWARE', 'Smoother Mobile Games: Settings and Habits', 'All brands', 'Android, iPhone', NULL, '/tips/phone-gaming-performance.jpg',
$tip$1. Use the game mode: Samsung Game Booster, Xiaomi Game Turbo, or Tecno and Infinix Game mode. They block notifications and focus power on the game.
2. Keep 10 to 20% storage free.
3. Close other apps and turn off battery saver while gaming.
4. Use Wi-Fi or strong 4G for online games. Check ping in the game settings.
5. Lower graphics or turn off high frame rate if the phone gets very hot.
6. Avoid gaming while fast charging. Heat slows the phone and wears the battery.
7. Remove thick cases during long sessions to let heat out.$tip$,
ARRAY['Game Booster'], now() - interval '1518 minutes'),

('software-tip-choosing-phone-case', 'SOFTWARE', 'Choosing a Phone Case That Actually Protects', 'All brands', 'All phones', NULL, '/tips/choosing-phone-case.jpg',
$tip$1. Raised edges (a lip) around the screen and camera so they don't touch the ground when dropped face down.
2. Thick corners: most drops land on a corner.
3. Exact model fit. A case for a similar model can block buttons, speakers or the fingerprint sensor.
4. Wireless charging or MagSafe: choose a thin case without metal plates.
5. Clean under the case every few weeks. Sand and grit scratch the phone.
6. Replace cracked or yellowed cases. They protect less.

Pair it with a good screen protector (see our tip). Ask us for the right case for your model.$tip$,
ARRAY['Phone case'], now() - interval '1519 minutes'),

('software-tip-screen-protector-types', 'SOFTWARE', 'Screen Protector Types: Which One Should You Buy?', 'All brands', 'All phones', NULL, '/tips/screen-protector-types.jpg',
$tip$1. Tempered glass: best protection and feel for flat screens. Look for full glue so it doesn't show a rainbow or lift.
2. Curved screens: full glue or UV glue glass, or flexible hydrogel film that wraps the edges.
3. Privacy glass: hides the screen from people beside you, but makes it darker.
4. Phones with under-screen fingerprint sensors: use protectors marked compatible, and re-register your fingerprint after fitting.
5. Matte film: less glare and fingerprints, slightly less sharp.

Fitting: clean with alcohol wipe, remove dust with the sticker, align carefully, press bubbles out from the centre. We fit them in shop too.$tip$,
ARRAY['Screen protector'], now() - interval '1520 minutes'),

('software-tip-usb-cable-types', 'SOFTWARE', 'USB Cable Types Explained: USB-C, Micro-USB and Lightning', 'All brands', 'Phones, laptops, accessories', NULL, '/tips/usb-cable-types.jpg',
$tip$USB-A: the big flat plug found on older chargers and computers.
USB-C: small, oval, fits either way. Most new phones, laptops and iPhone 15 and newer.
Micro-USB: older Android phones, speakers and power banks. Only fits one way.
Lightning: iPhone 5 to iPhone 14.

Not all cables are equal:
1. Some cheap cables charge only and can't transfer data (the phone won't show on the PC).
2. USB-C cables for laptops must support the power (60 W, 100 W or 240 W). A phone cable may not charge a laptop.
3. USB 2.0 cables transfer files slowly. USB 3 or higher is faster for drives.

Label your good cables so they don't get mixed up.$tip$,
ARRAY['USB cables'], now() - interval '1521 minutes'),

('software-tip-fake-chargers-cables', 'SOFTWARE', 'Spot Fake Chargers and Cables Before They Damage Your Phone', 'All brands', 'All phones', NULL, '/tips/fake-chargers-cables.jpg',
$tip$Warning signs:
1. Very light weight and a price far below the original.
2. Blurry printing, spelling mistakes, missing safety and certification marks.
3. The charger gets very hot, buzzes or smells.
4. The phone shows "slow charging" or "incompatible accessory".
5. The plug wobbles or fits loosely in the socket.

Fake chargers can overheat, damage the phone's charging chip (an expensive repair) or even cause fires.

Buy from trusted shops, and keep the original charger that came with the phone. Unplug chargers that feel hot.$tip$,
ARRAY['Original charger'], now() - interval '1522 minutes'),

('software-tip-laptop-travel-care', 'SOFTWARE', 'Carry Your Laptop Safely: Bags, Heat and Theft', 'All brands', 'Laptops', NULL, '/tips/laptop-travel-care.jpg',
$tip$1. Use a padded sleeve or laptop bag. Don't squeeze it into a tight bag with heavy items pressing on the lid.
2. Shut down or hibernate before packing, not just close the lid while it's busy. A laptop running in a bag overheats.
3. Never lift an open laptop by the screen. It loosens hinges and cracks screens.
4. Keep chargers, mice and pens out of the space between keyboard and screen when closing.
5. Don't leave it in a car, especially in the sun.
6. Back up before travel, and set a strong login password.

On boda bodas, carry the bag in front and hold it securely.$tip$,
ARRAY['Laptop bag'], now() - interval '1523 minutes'),

('software-tip-laptop-liquid-spill', 'SOFTWARE', 'Spilled Water, Tea or Soda on a Laptop? Act Fast', 'All brands', 'Laptops', NULL, '/tips/laptop-liquid-spill.jpg',
$tip$1. Unplug the charger and hold the power button to switch it off immediately. Don't save work first.
2. Remove the battery if it comes out easily, and unplug USB devices.
3. Turn the laptop upside down in a tent shape so liquid drains out of the keyboard.
4. Wipe what you can with a dry cloth.
5. Don't turn it on to test it. Don't use a hair dryer on hot settings.
6. Bring it in as soon as possible. Opening and cleaning the board quickly stops corrosion.

Sugary drinks and tea are worse than water: they leave sticky, corrosive residue even after drying.$tip$,
ARRAY['Dry cloth', 'Technician'], now() - interval '1524 minutes'),

('software-tip-reading-ebooks', 'SOFTWARE', 'Read eBooks on Your Phone or Tablet', 'All brands', 'Android, iPhone, tablets', NULL, '/tips/reading-ebooks.jpg',
$tip$1. Apps: Google Play Books, Kindle, Apple Books, or a PDF reader for school documents.
2. Free classics: Project Gutenberg (gutenberg.org) and Google Play Books' free section.
3. Adjust for comfort: bigger text, dark or sepia background, and line spacing.
4. Download books on Wi-Fi to read offline.
5. Highlight and make notes. They sync across your devices.
6. Turn on Night Light or Eye comfort when reading at night.

Dedicated e-readers (Kindle, Kobo) are easiest on the eyes and last weeks on one charge.$tip$,
ARRAY['Google Play Books', 'Kindle'], now() - interval '1525 minutes'),

('software-tip-sleep-and-screens', 'SOFTWARE', 'Sleep Better: Phones and Screens at Bedtime', 'All brands', 'All devices', NULL, '/tips/sleep-and-screens.jpg',
$tip$1. Stop scrolling 30 to 60 minutes before sleep, or switch to reading or audio.
2. Turn on Bedtime mode or Sleep Focus with Do Not Disturb (see our tips). Allow calls from family only.
3. Use Night Light, Night Shift or Eye comfort in the evening.
4. Charge the phone away from the bed, on a table, not under the pillow. It's also safer for the battery.
5. Use an alarm clock or StandBy mode so you don't need to touch the phone in bed.
6. Turn off notifications from social apps at night.$tip$,
ARRAY['Bedtime mode', 'Do Not Disturb'], now() - interval '1526 minutes'),

('software-tip-digital-detox', 'SOFTWARE', 'Spend Less Time on Your Phone: Simple Settings That Help', 'All brands', 'Android, iPhone', NULL, '/tips/digital-detox.jpg',
$tip$1. Check your daily use: Screen Time (iPhone) or Digital Wellbeing (Android).
2. Set app timers for social media and games.
3. Move distracting apps off the home screen into a folder.
4. Turn off notifications from apps that don't need to interrupt you.
5. Greyscale mode makes the phone less tempting (Bedtime mode or Accessibility, Colour filters).
6. Keep phones off the table during meals and family time.
7. Use Focus or Modes for work and study hours.$tip$,
ARRAY['Screen Time', 'Digital Wellbeing'], now() - interval '1527 minutes'),

('software-tip-budget-tracking-phone', 'SOFTWARE', 'Track Your Money and Business Expenses on Your Phone', 'All brands', 'Android, iPhone', NULL, '/tips/budget-tracking-phone.jpg',
$tip$1. Simple start: a Google Sheets spreadsheet with columns for Date, Item, Category, Money in, Money out.
2. Record every expense the same day. Mobile money and bank SMS help you remember.
3. Download mobile money and bank statements monthly to check nothing is missed.
4. Separate business and personal money, ideally with separate numbers or accounts.
5. Set monthly limits per category (transport, airtime, stock) and compare each month.
6. Budget apps (for example Money Manager or Wallet) give charts automatically.

Back up the sheet. Google Sheets saves to your Google Drive automatically.$tip$,
ARRAY['Google Sheets', 'Budget app'], now() - interval '1528 minutes'),

('software-tip-phone-calculator-tricks', 'SOFTWARE', 'Hidden Features in Your Phone Calculator', 'All brands', 'Android, iPhone', NULL, '/tips/phone-calculator-tricks.jpg',
$tip$1. Turn the phone sideways (with rotation on) for a scientific calculator.
2. iPhone: swipe left or right on the number to delete the last digit. iOS 18 adds history and unit conversion.
3. Samsung: the ruler icon opens a unit converter (length, weight, area, currency on some versions).
4. History: Android calculators keep recent sums. Tap one to reuse it.
5. Percentages: 250000 + 18% gives the price with 18% added on most phone calculators.
6. Long press the result to copy it into a message.

For bigger calculations with records, use a spreadsheet (see our budget tip).$tip$,
ARRAY['Calculator'], now() - interval '1529 minutes'),

('software-tip-professional-business-calls', 'SOFTWARE', 'Handle Business Calls Professionally on Your Phone', 'All brands', 'Android, iPhone', NULL, '/tips/professional-business-calls.jpg',
$tip$1. Answer with your business name: "Good morning, MS Soft GSM, how can I help?"
2. Save customer numbers with useful names (for example "Peter, Samsung A14 screen") so you recognise them later.
3. Missed a call? Call or WhatsApp back the same day.
4. Use quick decline messages when you're busy (see our answer calls tip).
5. Note prices and promises in Google Keep or Notes during the call.
6. Use earphones for long calls so you can type and keep both hands free.
7. A separate business number or WhatsApp Business keeps work and personal apart.$tip$,
ARRAY['Phone app', 'Notes'], now() - interval '1530 minutes'),

('software-tip-whatsapp-business', 'SOFTWARE', 'WhatsApp Business: Catalog, Quick Replies and Away Messages', 'All brands', 'WhatsApp Business', NULL, '/tips/whatsapp-business.jpg',
$tip$1. Install WhatsApp Business (free) and register your shop number.
2. Business profile: name, category, address, opening hours, website.
3. Catalog: add products with photos, prices and descriptions. Customers can browse and send you items.
4. Greeting message: an automatic welcome for new customers.
5. Away message: replies automatically outside working hours.
6. Quick replies: type / to insert saved answers like prices, location or payment details.
7. Labels: tag chats as New customer, Paid, Pending delivery.
8. Share your short link (wa.me) on posters and social media.$tip$,
ARRAY['WhatsApp Business'], now() - interval '1531 minutes'),

('software-tip-online-classes', 'SOFTWARE', 'Tips for Online Classes and Learning from Home', 'All brands', 'Phones and laptops', NULL, '/tips/online-classes.jpg',
$tip$1. Prepare: charge your device, test the link and your earphones before class starts.
2. A quiet place with light in front of you (see our webcam tip).
3. Save data: turn off your video when not speaking, and download materials on Wi-Fi.
4. Google Classroom, Zoom, Teams or Moodle: install the app and turn on notifications for your classes.
5. Take notes in Google Docs, OneNote or a notebook. Recordings help with revision.
6. Take short breaks every 45 to 60 minutes and rest your eyes (see our eye strain tip).

A laptop or tablet is easier than a phone for long classes and writing assignments.$tip$,
ARRAY['Google Classroom', 'Zoom'], now() - interval '1532 minutes'),

('software-tip-learn-touch-typing', 'SOFTWARE', 'Learn to Type Faster on a Computer for Free', 'All brands', 'Laptops and desktops', NULL, '/tips/learn-touch-typing.jpg',
$tip$1. Touch typing: keep fingers on the home row (A S D F and J K L ;). The small bumps on F and J help you find it without looking.
2. Practise 10 to 15 minutes a day on free sites like typing.com, keybr.com or monkeytype.com.
3. Focus on accuracy first. Speed comes later.
4. Don't look at the keyboard. Cover your hands with a cloth if you must.
5. Sit up straight with wrists relaxed and the screen at eye level.

Most people reach 30 to 40 words per minute within a few weeks. Useful for jobs, school and business.$tip$,
ARRAY['typing.com', 'keybr.com'], now() - interval '1533 minutes'),

('software-tip-email-signature', 'SOFTWARE', 'Add a Professional Email Signature in Gmail and Outlook', 'All brands', 'Gmail, Outlook', NULL, '/tips/email-signature.jpg',
$tip$Gmail (computer): Settings (gear), See all settings, General, Signature, Create new. Save at the bottom.
Gmail app: Settings, your account, Mobile signature.
Outlook: Settings, Mail, Compose and reply (or File, Options, Mail, Signatures).

What to include:
Your name and role
Business name
Phone and WhatsApp number
Website and location

Keep it short: 3 to 5 lines, no huge images or quotes. Big images make emails look like spam.$tip$,
ARRAY['Gmail', 'Outlook'], now() - interval '1534 minutes'),

('software-tip-google-account-recovery', 'SOFTWARE', 'Make Sure You Can Recover Your Google Account', 'All brands', 'Google account', NULL, '/tips/google-account-recovery.jpg',
$tip$Losing your Google account means losing Gmail, contacts, photos, Play Store purchases and possibly the phone (FRP).

1. Open myaccount.google.com, Security.
2. Add a recovery phone number you will keep, and a recovery email.
3. Turn on 2-Step Verification, and save backup codes somewhere safe (see our tip).
4. Write down your Gmail address and password and store them safely.
5. Locked out? Go to accounts.google.com/signin/recovery and answer as accurately as you can, from a device and place you normally use.

Keep your old phone number active if it's your recovery number.$tip$,
ARRAY['Google Account'], now() - interval '1535 minutes'),

('software-tip-apple-account-recovery', 'SOFTWARE', 'Make Sure You Can Recover Your Apple Account', 'Apple', 'iPhone, iPad, Mac', NULL, '/tips/apple-account-recovery.jpg',
$tip$Forgetting your Apple ID password can lock you out of iCloud, and Activation Lock can stop the phone being reset.

1. Settings, your name, Sign-In and Security: check your trusted phone numbers are current.
2. Account Recovery: add a Recovery Contact (a family member with an iPhone) who can help you get back in.
3. Write down your Apple ID email and password and keep them safe.
4. Forgot the password? Use iforgot.apple.com, or "Forgot password" on the iPhone.
5. Selling or giving away the iPhone? Sign out of Apple ID first (see our tips).

Only the real owner can remove Activation Lock, with the Apple ID or proof of purchase through Apple.$tip$,
ARRAY['Apple ID', 'Recovery Contact'], now() - interval '1536 minutes')
ON CONFLICT ("id") DO NOTHING;
