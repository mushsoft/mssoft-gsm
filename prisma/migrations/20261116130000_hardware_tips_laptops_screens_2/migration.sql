-- One-time content load (no schema change): 24 hardware tips on accessories, laptops and screen protectors,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-controller-not-connecting-bluetooth', 'HARDWARE', 'Controller Not Connecting by Bluetooth', 'All brands', '', NULL, '/tips/hw-controller-not-connecting-bluetooth.jpg',
$tip$When a wireless game controller won't connect:

1. Charge it fully with a cable.
2. Connect it once with the USB cable to pair it, then unplug.
3. Remove it from the console, phone or PC Bluetooth list and pair it again.
4. Reset the controller (many have a small reset hole on the back).
5. Turn off other paired devices nearby that may grab the connection.
6. Update the console or PC and the controller.

If it works only on a cable, its Bluetooth or battery may be faulty.$tip$,
ARRAY['USB cable'], now() - interval '52 minutes'),

('hardware-tip-controller-battery-care', 'HARDWARE', 'Controller Battery Care', 'All brands', '', NULL, '/tips/hw-controller-battery-care.jpg',
$tip$Controller batteries wear out like phone batteries.

1. Don't leave it charging all the time on a cable.
2. Charge it before it is completely empty.
3. Lower the controller's light bar brightness and vibration to save power.
4. Store it half charged if you won't use it for weeks.
5. Keep it away from heat.

When a controller lasts only an hour or two, the battery can usually be replaced by a technician.$tip$,
ARRAY[]::text[], now() - interval '54 minutes'),

('hardware-tip-wired-controller-not-detected-pc', 'HARDWARE', 'Wired Controller Not Detected on PC', 'All brands', '', NULL, '/tips/hw-wired-controller-not-detected-pc.jpg',
$tip$If a PC doesn't detect a controller:

1. Try a different USB cable. Many cables only charge and don't carry data.
2. Try another USB port, directly on the PC.
3. Check Device Manager or "Set up USB game controllers" in Windows to see if it appears.
4. Some controllers need a mode switch (for example XInput or DirectInput) or a driver.
5. In games and Steam, turn on support for that controller type.

If no PC detects it on any cable, the controller's port or board may be faulty.$tip$,
ARRAY['Another USB cable'], now() - interval '56 minutes'),

('hardware-tip-controller-buttons-sticky', 'HARDWARE', 'Controller Buttons Sticky or Unresponsive', 'All brands', '', NULL, '/tips/hw-controller-buttons-sticky.jpg',
$tip$Sticky buttons are usually from spills and dirt.

1. Unplug the controller and remove batteries if it has them.
2. Clean around the buttons with a cotton bud dipped lightly in isopropyl alcohol, pressing the buttons many times.
3. For bad cases, open the controller and clean the button rubbers and the contact pads on the board.
4. Let it dry fully before using.
5. Worn rubber contacts can be replaced.

Keep drinks and greasy snacks away from controllers.$tip$,
ARRAY['Screwdriver set', 'Isopropyl alcohol', 'Cotton buds'], now() - interval '58 minutes'),

('hardware-tip-wireless-mouse-lagging', 'HARDWARE', 'Wireless Mouse Lagging or Jumping', 'All brands', '', NULL, '/tips/hw-wireless-mouse-lagging.jpg',
$tip$A jumpy or slow wireless mouse is usually an easy fix.

1. Replace or charge the battery. Weak batteries cause lag.
2. Move the USB receiver closer, for example to a front port or a short extension cable.
3. Use a mouse mat. Glass, glossy and very dark surfaces confuse the sensor.
4. Clean the sensor window under the mouse with a dry cotton bud.
5. Keep other wireless devices and metal objects away from the receiver.

If a Bluetooth mouse lags, remove it from Bluetooth settings and pair it again.$tip$,
ARRAY[]::text[], now() - interval '60 minutes'),

('hardware-tip-mouse-double-clicking', 'HARDWARE', 'Mouse Double Clicking by Itself', 'All brands', '', NULL, '/tips/hw-mouse-double-clicking.jpg',
$tip$When a single click opens things twice, or drag and drop keeps dropping, the mouse switch is worn.

1. Check the double click speed in mouse settings to rule out software.
2. Try the mouse on another computer.
3. If it still double clicks, the switch under the button is worn.
4. A technician can replace the small switch by soldering, which is cheap on good mice.
5. For cheap mice, replacing the mouse is simpler.

Heavy clicking in games wears switches faster.$tip$,
ARRAY['Screwdriver set', 'Replacement switch'], now() - interval '62 minutes'),

('hardware-tip-wireless-mouse-battery-receiver', 'HARDWARE', 'Wireless Mouse Battery and Receiver Tips', 'All brands', '', NULL, '/tips/hw-wireless-mouse-battery-receiver.jpg',
$tip$Keep a wireless mouse working longer:

1. Switch it off when not in use if it has a switch.
2. Use good alkaline or rechargeable batteries. Remove them if the mouse won't be used for months, to avoid leaks.
3. Store the USB receiver inside the mouse when travelling so it isn't lost.
4. A lost receiver can't always be replaced. Some brands let you pair a new receiver with their software.
5. Bluetooth mice don't need a receiver, which frees a USB port.

Battery leaks corrode the contacts. Clean them with a little vinegar on a cotton bud, then dry.$tip$,
ARRAY[]::text[], now() - interval '64 minutes'),

('hardware-tip-rugged-phone-cases', 'HARDWARE', 'Rugged Phone Cases: Do They Really Protect?', 'All brands', '', NULL, '/tips/hw-rugged-phone-cases.jpg',
$tip$A good rugged case saves many screens and backs.

What makes a case protective:
1. Raised edges around the screen and camera, so they don't touch the ground when dropped flat.
2. Thick corners: most drops land on a corner.
3. Shock absorbing material (TPU) inside, with a hard shell outside.
4. A good fit with no loose gaps.

What a case can't do:
1. Stop a screen cracking from a hard hit on the screen itself. Use a screen protector too.
2. Make the phone waterproof, unless it is a sealed waterproof case.

For boda riders, builders and kids, a rugged case is well worth it.$tip$,
ARRAY[]::text[], now() - interval '66 minutes'),

('hardware-tip-cheap-phone-cases-problems', 'HARDWARE', 'Cheap Phone Cases: When They Cause Problems', 'All brands', '', NULL, '/tips/hw-cheap-phone-cases-problems.jpg',
$tip$Some cheap cases cause faults:

1. Cases that are too tight press on the buttons, which can cause restarts or a stuck volume.
2. Thick edges stop the charger or earphone plug going all the way in.
3. Poor camera cut outs cause dark corners or flash glare in photos.
4. Hard cases with no shock absorption protect very little in a fall.
5. Dirt trapped under the case scratches the phone.

Take the case off and clean the phone every few weeks.$tip$,
ARRAY[]::text[], now() - interval '68 minutes'),

('hardware-tip-phone-cases-and-heat', 'HARDWARE', 'Phone Cases and Heat: Remove While Fast Charging', 'All brands', '', NULL, '/tips/hw-phone-cases-and-heat.jpg',
$tip$Thick cases hold heat in. Heat slows charging and wears the battery.

1. If the phone gets hot while charging or gaming, take the case off.
2. Leather and thick rugged cases trap the most heat.
3. Don't charge a phone in a case under a pillow or in the sun.
4. If your phone often says charging paused because it is too hot, try charging it without the case.

Put the case back on once it cools, especially before going out.$tip$,
ARRAY[]::text[], now() - interval '70 minutes'),

('hardware-tip-ring-magnet-phone-cases', 'HARDWARE', 'Ring and Magnet Phone Cases: Camera and Wireless Charging Issues', 'All brands', '', NULL, '/tips/hw-ring-magnet-phone-cases.jpg',
$tip$Ring holders and magnetic car mount plates are handy but cause a few problems.

1. Metal plates and rings block wireless charging and can make the pad heat up.
2. Strong magnets close to the camera can affect stabilisation on some phones.
3. Metal plates can interfere with NFC payments and compass apps.
4. Stick metal plates low on the case, away from the charging coil, or use a case with MagSafe style magnets made for it.

If wireless charging stopped working, remove the plate or ring first.$tip$,
ARRAY[]::text[], now() - interval '72 minutes'),

('hardware-tip-wallet-phone-cases-cards', 'HARDWARE', 'Wallet Phone Cases and Bank Cards', 'All brands', '', NULL, '/tips/hw-wallet-phone-cases-cards.jpg',
$tip$Wallet cases are handy, but a few things to know:

1. Magnetic clasps can damage cards with magnetic stripes over time.
2. Cards in the case block wireless charging. Remove them before charging on a pad.
3. Bulky wallet cases make the phone harder to grip, so drops are more common.
4. Don't keep all your cards and ID with the phone: if it is lost, everything goes.

A slim card holder on the back is a good middle ground.$tip$,
ARRAY[]::text[], now() - interval '74 minutes'),

('hardware-tip-hdmi-laptop-to-tv-no-picture', 'HARDWARE', 'HDMI From Laptop to TV: No Picture Fixes', 'All brands', '', NULL, '/tips/hw-hdmi-laptop-to-tv-no-picture.jpg',
$tip$If the TV shows "no signal" with a laptop connected:

1. Select the right HDMI input on the TV (HDMI 1, 2...).
2. On the laptop, press Windows + P and choose Duplicate or Extend.
3. Try another HDMI cable and another HDMI port on the TV.
4. Connect the cable before switching the laptop on, or restart with it connected.
5. Update the laptop's graphics driver.
6. Lower the laptop's screen resolution if the TV is older.

If sound plays from the laptop instead of the TV, choose the TV as the sound output.$tip$,
ARRAY['HDMI cable'], now() - interval '76 minutes'),

('hardware-tip-laptop-hdmi-port-loose', 'HARDWARE', 'Laptop HDMI Port Loose or Damaged', 'All brands', '', NULL, '/tips/hw-laptop-hdmi-port-loose.jpg',
$tip$HDMI ports break when cables are pulled sideways or the laptop is moved while connected.

1. Look inside the port with a torch for bent pins or broken plastic.
2. If the picture cuts out when the cable moves, the port or its solder joints are damaged.
3. On many laptops, the HDMI port is soldered to the main board and needs careful board work to replace.
4. A USB-C to HDMI adapter can be a quick workaround if the laptop's USB-C supports video.

Unplug HDMI cables before moving or closing the laptop.$tip$,
ARRAY['Torch'], now() - interval '78 minutes'),

('hardware-tip-laptop-ports-explained', 'HARDWARE', 'Laptop Ports Explained: USB-A, USB-C, HDMI and Ethernet', 'All brands', '', NULL, '/tips/hw-laptop-ports-explained.jpg',
$tip$Knowing the ports helps you buy the right cables and adapters.

1. USB-A: the classic rectangle. For flash drives, mice and printers.
2. USB-C: small and oval. Can carry charging, data and video, depending on the laptop. Thunderbolt ports (with a lightning symbol) do all three, fast.
3. HDMI: for TVs, projectors and monitors.
4. Ethernet (RJ45): for wired internet. More stable than Wi-Fi.
5. Audio jack: for headphones and headsets.
6. Card reader: for SD cards from cameras.

Small symbols next to ports show what they support.$tip$,
ARRAY[]::text[], now() - interval '80 minutes'),

('hardware-tip-laptop-screen-black-but-on', 'HARDWARE', 'Laptop Screen Black but Laptop Is On', 'All brands', '', NULL, '/tips/hw-laptop-screen-black-but-on.jpg',
$tip$If the laptop's lights and fan are on but the screen is black:

1. Press the brightness up key. It may be turned all the way down.
2. Shine a torch on the screen. A faint picture means the backlight has failed.
3. Connect an external monitor or TV. If it shows a picture, the laptop works and the fault is the screen, its cable or backlight.
4. Hold the power button for 15 seconds, unplug the charger, then start again.
5. If the external monitor is also black, the problem may be memory (RAM) or the board.

Screen cable faults often show as flickering when you move the lid.$tip$,
ARRAY['External monitor', 'Torch'], now() - interval '82 minutes'),

('hardware-tip-laptop-screen-dim-outdoors', 'HARDWARE', 'Laptop Screen Too Dim Outdoors', 'All brands', '', NULL, '/tips/hw-laptop-screen-dim-outdoors.jpg',
$tip$Most laptop screens are hard to read in sunlight.

1. Turn brightness to the maximum and turn off battery saver, which dims the screen.
2. Turn off adaptive brightness if it keeps dimming the screen.
3. Use a dark theme indoors and a light one outdoors, whichever is easier to read.
4. Work in shade with your back to the sun.
5. An anti glare screen protector reduces reflections.

If the screen is dim even indoors at full brightness, the backlight may be failing.$tip$,
ARRAY[]::text[], now() - interval '84 minutes'),

('hardware-tip-laptop-screen-flickering', 'HARDWARE', 'Laptop Screen Flickering', 'All brands', '', NULL, '/tips/hw-laptop-screen-flickering.jpg',
$tip$Flickering can be software, the screen cable or the panel.

1. Update the graphics driver.
2. Check the screen refresh rate setting matches the panel.
3. Connect an external monitor. If it doesn't flicker, the laptop's screen or cable is the problem.
4. Open and close the lid slowly. If flicker changes with the lid angle, the screen cable is worn at the hinge.
5. If flicker is constant at any angle, the panel may be failing.

Screen cables are usually cheaper to replace than the panel.$tip$,
ARRAY['External monitor'], now() - interval '86 minutes'),

('hardware-tip-laptop-screen-replacement-panel', 'HARDWARE', 'Replacing a Laptop Screen: Find the Right Panel', 'All brands', '', NULL, '/tips/hw-laptop-screen-replacement-panel.jpg',
$tip$Laptop screens look alike, but the wrong panel won't fit or work.

1. Find the panel's part number on the sticker on the back of the old screen.
2. Match size, resolution, connector type (often 30 or 40 pin), and refresh rate.
3. Check the screw tabs and whether it is a touch screen.
4. Disconnect the battery before starting.
5. Remove the bezel carefully. Some panels are held by adhesive strips instead of screws.
6. Test the new panel before closing everything up.

Buying by part number avoids most mistakes.$tip$,
ARRAY['Screwdriver set', 'Plastic picks'], now() - interval '88 minutes'),

('hardware-tip-laptop-screen-lines-spots', 'HARDWARE', 'Laptop Screen Lines or Spots', 'All brands', '', NULL, '/tips/hw-laptop-screen-lines-spots.jpg',
$tip$Lines and spots usually mean screen damage, but check first.

1. Connect an external monitor. If the lines aren't there, the laptop's panel or cable is the issue.
2. Lines that change when you press the lid frame point to a damaged panel or a loose cable.
3. A black or ink like spot that spreads means the panel is cracked inside, often from pressure (closing the lid on a pen or earphones).
4. Bright white spots are often pressure marks on the backlight layer.

Never close a laptop with anything on the keyboard.$tip$,
ARRAY['External monitor'], now() - interval '90 minutes'),

('hardware-tip-laptop-touchpad-not-working', 'HARDWARE', 'Laptop Touchpad Not Working', 'All brands', '', NULL, '/tips/hw-laptop-touchpad-not-working.jpg',
$tip$If the touchpad doesn't respond:

1. Check the touchpad isn't turned off with a function key (often F5, F6 or F9, or a small light on the pad).
2. In settings, make sure the touchpad is turned on, especially if a mouse is connected.
3. Restart the laptop.
4. Update or reinstall the touchpad driver.
5. A raised or hard to click touchpad can be pushed up by a swollen battery underneath. Check that first.
6. If the touchpad fails after a spill, its cable or board may be damaged.

Use a USB mouse while waiting for the repair.$tip$,
ARRAY['External mouse'], now() - interval '92 minutes'),

('hardware-tip-laptop-battery-care', 'HARDWARE', 'Laptop Battery Care: Make It Last Longer', 'All brands', '', NULL, '/tips/hw-laptop-battery-care.jpg',
$tip$Laptop batteries last longer with a few habits.

1. If the laptop is always plugged in, turn on the maker's battery protection mode (often limits charging to 80%).
2. Don't leave it plugged in at 100% in a hot room every day.
3. Use it on a hard surface so it stays cool.
4. Avoid draining to 0% often.
5. If stored for weeks, leave it at about half charge.

Check battery health in the maker's app or with a battery report in Windows.$tip$,
ARRAY[]::text[], now() - interval '94 minutes'),

('hardware-tip-laptop-dc-jack-repair', 'HARDWARE', 'Laptop DC Jack Repair', 'All brands', '', NULL, '/tips/hw-laptop-dc-jack-repair.jpg',
$tip$The round charging jack on many laptops breaks when the cable is bumped while plugged in.

Signs:
1. Charging only works when the plug is held at an angle.
2. The plug feels loose or wobbles.
3. Burnt smell or marks around the jack.

Repair:
1. Many laptops have the jack on a short cable. Replace the cable and jack together.
2. On others, the jack is soldered to the board and needs careful desoldering.
3. Check the board around the jack for burn damage.

Route the charger cable so it can't be tripped over.$tip$,
ARRAY['Screwdriver set', 'Soldering iron', 'Multimeter'], now() - interval '96 minutes'),

('hardware-tip-laptop-fan-noise', 'HARDWARE', 'Laptop Fan Noise: Normal or a Problem?', 'All brands', '', NULL, '/tips/hw-laptop-fan-noise.jpg',
$tip$Some fan noise is normal, especially when working hard.

Normal:
1. Fan speeds up during games, video calls or big downloads.
2. Fan runs for a while after heavy work, then quietens.

A problem:
1. Fan runs loudly all the time even when idle.
2. Grinding, rattling or clicking noise.
3. Fan never runs and the laptop gets very hot.

What to do:
1. Check Task Manager for programs using a lot of processor power.
2. Clean the fan and vents (see our overheating tip).
3. Replace a fan that grinds or rattles.$tip$,
ARRAY[]::text[], now() - interval '98 minutes')
ON CONFLICT ("id") DO NOTHING;
