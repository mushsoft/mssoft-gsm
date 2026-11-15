-- One-time content load (no schema change): 25 hardware tips on laptops, tablets and accessories,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-laptop-overheating-fans-vents', 'HARDWARE', 'Laptop Overheating: Clean the Fans and Vents', 'All brands', '', NULL, '/tips/hw-laptop-overheating-fans-vents.jpg',
$tip$A laptop that gets very hot, runs its fan loudly or slows down under load usually has dust packed in the fan and heatsink.

1. Feel where the hot air comes out. Weak airflow from a loud fan means the heatsink fins are blocked.
2. Use the laptop on a hard, flat surface. Beds and cushions block the air intake underneath.
3. Shut down, unplug the charger and disconnect the battery inside before cleaning.
4. Remove the bottom cover and hold the fan still with a finger or plastic tool, so it doesn't spin too fast while you blow it out.
5. Brush the dust off the fan blades and blow it out of the heatsink fins.
6. If the fan rattles or grinds, replace it.

In dusty areas, a laptop used every day benefits from a fan clean about once a year.$tip$,
ARRAY['Screwdriver set', 'Soft brush', 'Air blower'], now() - interval '2 minutes'),

('hardware-tip-laptop-thermal-paste', 'HARDWARE', 'Laptop Thermal Paste: When and How to Replace It', 'All brands', '', NULL, '/tips/hw-laptop-thermal-paste.jpg',
$tip$Thermal paste carries heat from the processor to the heatsink. After a few years it dries and the laptop runs hot even with clean fans.

Signs it needs changing:
1. The fan is clean but the laptop still overheats.
2. The laptop switches off during heavy work or games.
3. It is more than three or four years old and was never serviced.

How to do it:
1. Disconnect the battery, then unscrew the heatsink in the order printed on it.
2. Wipe off the old paste from the chip and heatsink with isopropyl alcohol.
3. Apply a pea size dot of good paste in the middle of the chip. Don't spread it to the edges.
4. Refit the heatsink and tighten the screws a little at a time, in the numbered order.

Don't use too much paste, and keep it off the small parts around the chip.$tip$,
ARRAY['Thermal paste', 'Isopropyl alcohol', 'Lint free cloth', 'Screwdriver set'], now() - interval '4 minutes'),

('hardware-tip-laptop-battery-swelling', 'HARDWARE', 'Laptop Battery Swelling: Raised Touchpad and Lifted Case', 'All brands', '', NULL, '/tips/hw-laptop-battery-swelling.jpg',
$tip$A swollen laptop battery is a fire risk and can crack the case or touchpad.

Signs:
1. The touchpad is raised, hard to click or clicks by itself.
2. The bottom cover bulges or the laptop rocks on a table.
3. Gaps open along the case edges.

What to do:
1. Stop charging it and shut it down.
2. Back up important files from another computer if possible.
3. Remove the battery as soon as you can. Don't press on the swelling.
4. Never puncture or bend it. Put it in a metal tray or sand until disposal.
5. Fit a quality replacement battery for that exact model.

Many laptops run fine on the charger alone while you wait for a new battery, but don't leave the swollen one inside.$tip$,
ARRAY['Screwdriver set', 'Fireproof tray'], now() - interval '6 minutes'),

('hardware-tip-laptop-not-charging', 'HARDWARE', 'Laptop Not Charging: Adapter, Jack or Battery?', 'All brands', '', NULL, '/tips/hw-laptop-not-charging.jpg',
$tip$Find out which part has failed before buying anything.

1. Check the adapter light. If it is off or flickers, the adapter or its cable is likely faulty.
2. Measure the adapter's output with a multimeter. It should match the voltage on its label (often 19 or 20V).
3. Wiggle the plug in the laptop. If charging comes and goes, the DC jack or its cable inside is loose.
4. Try a known good adapter of the right type.
5. If the laptop runs on the adapter but the battery stays at 0%, the battery is likely worn out.
6. On USB-C laptops, try another USB-C port and a charger with enough watts (often 45W or more).

If a good adapter and battery still don't work, the charging circuit on the board needs a technician.$tip$,
ARRAY['Multimeter', 'Known good adapter'], now() - interval '8 minutes'),

('hardware-tip-laptop-keyboard-keys-not-working', 'HARDWARE', 'Laptop Keyboard Keys Not Working', 'All brands', '', NULL, '/tips/hw-laptop-keyboard-keys-not-working.jpg',
$tip$If some keys stop working, find out if it is dirt, software or a broken keyboard.

1. Restart the laptop.
2. Plug in a USB keyboard. If it works, the laptop keyboard itself is the problem.
3. Check the keys in the BIOS or setup screen. If they don't work there either, it is hardware.
4. Blow out crumbs under the keys with an air blower held at an angle.
5. Gently lift a stuck keycap with a plastic pick and clean under it. Don't force the small clips.
6. If a row of keys stopped after a spill, the keyboard membrane is damaged and needs replacing.

Many laptop keyboards are sold for each model, and some are riveted to the top case, which makes the job longer.$tip$,
ARRAY['Air blower', 'Plastic pick', 'External USB keyboard'], now() - interval '10 minutes'),

('hardware-tip-laptop-keyboard-spill', 'HARDWARE', 'Spilled a Drink on a Laptop Keyboard: What to Do', 'All brands', '', NULL, '/tips/hw-laptop-keyboard-spill.jpg',
$tip$Act fast. The board is often just under the keyboard.

1. Unplug the charger and hold the power button to switch off at once.
2. Turn the laptop upside down, open like a tent, to let liquid drain out.
3. Wipe away what you can. Don't use a hair dryer on high heat.
4. If you can, remove the battery.
5. Don't switch it on to check. Power through wet parts causes the real damage.
6. Bring it to a technician to open it, clean the board with alcohol and dry it properly.

Sugary drinks like tea and soda leave sticky residue that keeps causing faults, even after the laptop dries.$tip$,
ARRAY['Dry cloth', 'Screwdriver set'], now() - interval '12 minutes'),

('hardware-tip-upgrade-laptop-to-ssd', 'HARDWARE', 'Upgrade a Slow Laptop from Hard Drive to SSD', 'All brands', '', NULL, '/tips/hw-upgrade-laptop-to-ssd.jpg',
$tip$Swapping an old spinning hard drive for an SSD is the single best speed upgrade for most older laptops.

1. Check what the laptop takes: a 2.5 inch SATA drive, an M.2 SATA SSD or an M.2 NVMe SSD.
2. Back up the customer's files first.
3. Either clone the old drive to the SSD with cloning software and a USB adapter, or install Windows fresh on the SSD and copy files back.
4. Fit the SSD and check it shows in the BIOS.
5. Make sure Windows is activated with the customer's licence.

Startup often drops from minutes to seconds. Pair it with more RAM for a laptop that feels new.$tip$,
ARRAY['SSD', 'USB to SATA adapter', 'Screwdriver set'], now() - interval '14 minutes'),

('hardware-tip-failing-laptop-hard-drive', 'HARDWARE', 'Signs a Laptop Hard Drive Is Failing', 'All brands', '', NULL, '/tips/hw-failing-laptop-hard-drive.jpg',
$tip$Hard drives often give warnings before they die. Back up as soon as you notice them.

Warning signs:
1. Clicking, grinding or beeping sounds from the laptop.
2. Very slow startup and files that take long to open.
3. Freezing, then the drive light staying on.
4. Errors about disk or "repairing drive" at startup.
5. A drive health tool shows bad sectors or "caution".

What to do:
1. Copy the most important files first, not the whole drive.
2. Avoid running long repair scans on a dying drive.
3. Replace it with an SSD (see our SSD upgrade tip).

If the drive is clicking and the files are very important, stop using it and get professional data recovery.$tip$,
ARRAY['Drive health tool', 'External drive for backup'], now() - interval '16 minutes'),

('hardware-tip-adding-ram-laptop', 'HARDWARE', 'Adding RAM to a Laptop: Check Before You Buy', 'All brands', '', NULL, '/tips/hw-adding-ram-laptop.jpg',
$tip$More RAM helps a laptop that slows down with many browser tabs or programs open.

1. Check the current RAM and type (DDR3, DDR4, DDR5) in the system information.
2. Check how many slots there are and if any are free. Many thin laptops have RAM soldered to the board and can't be upgraded.
3. Match the type and speed. Mixing sizes usually works, but matching pairs is best.
4. Disconnect the battery before opening.
5. Insert the module at an angle, press it down until the clips lock.
6. Check the new total in system information.

8GB is a comfortable minimum for Windows today. 16GB helps with heavy work.$tip$,
ARRAY['Screwdriver set', 'System information tool'], now() - interval '18 minutes'),

('hardware-tip-broken-laptop-hinge', 'HARDWARE', 'Broken Laptop Hinge: Fix It Before the Screen Cracks', 'All brands', '', NULL, '/tips/hw-broken-laptop-hinge.jpg',
$tip$A stiff or loose hinge slowly breaks the screws' mounts in the plastic case, and then the screen panel cracks.

Signs:
1. The screen wobbles or won't stay open.
2. A gap opens near the hinge when you open the lid.
3. Clicking or cracking sounds when opening.

Fixing it:
1. Stop opening the laptop from one corner. Open it from the middle.
2. Open the case and check the hinge screws and their brass mounts.
3. Tighten loose screws, or rebuild broken mounts with strong epoxy or a replacement mount.
4. Replace hinges that are seized or bent.
5. Check the screen cable isn't pinched or torn.

Fixing a hinge early is much cheaper than a new screen and case.$tip$,
ARRAY['Screwdriver set', 'Epoxy or hinge mount', 'Replacement hinges'], now() - interval '20 minutes'),

('hardware-tip-buying-used-laptop', 'HARDWARE', 'Buying a Used Laptop: Hardware Checks', 'All brands', '', NULL, '/tips/hw-buying-used-laptop.jpg',
$tip$Check these before paying for a used laptop.

1. Look for cracks near the hinges and a bulging bottom or raised touchpad (swollen battery).
2. Check the screen on white and black for lines, spots and dead pixels.
3. Test every key and the touchpad.
4. Test all USB ports with a flash drive, and the charging port.
5. Unplug the charger and see how long the battery lasts.
6. Check the drive type and health, and how much RAM it has.
7. Test Wi-Fi, webcam, speakers and microphone.
8. Make sure it isn't locked with a BIOS password or tied to a company account.
9. Ask for the charger and check it is the right one.

A cheap laptop with a dying battery and hard drive can need more money than it saves.$tip$,
ARRAY['USB flash drive', 'Charger'], now() - interval '22 minutes'),

('hardware-tip-laptop-usb-ports-not-working', 'HARDWARE', 'Laptop USB Ports Not Working', 'All brands', '', NULL, '/tips/hw-laptop-usb-ports-not-working.jpg',
$tip$When a USB port doesn't detect anything, check the simple things first.

1. Try another device and another port to see if it is one port or all.
2. Restart the laptop. Windows sometimes turns off a port after a power problem.
3. Look inside the port with a torch for bent pins or dirt.
4. In Device Manager, check for warnings under USB controllers and update or reinstall the driver.
5. Turn off USB power saving in the power options.
6. If one port is physically loose or broken, the port or its small board needs replacing.

If all ports died together after a spill or a short, the board needs checking by a technician.$tip$,
ARRAY['Flash drive', 'Torch'], now() - interval '24 minutes'),

('hardware-tip-usb-c-hubs-adapters-laptop', 'HARDWARE', 'USB-C Hubs and Adapters for Laptops: What to Know', 'All brands', '', NULL, '/tips/hw-usb-c-hubs-adapters-laptop.jpg',
$tip$Many new laptops only have USB-C ports. A hub adds USB, HDMI, card reader and network, but they differ a lot.

1. Check what the laptop's USB-C port supports: charging, video and data. Not every port does all three.
2. For screens, check the hub's HDMI supports the resolution you need.
3. Use a hub with power pass through if you need to charge while using it.
4. Cheap hubs can get very hot and drop connections.
5. If a monitor doesn't show, try another port on the laptop, as only some support video.

Keep one good hub at the counter for testing customer laptops.$tip$,
ARRAY[]::text[], now() - interval '26 minutes'),

('hardware-tip-replacement-laptop-charger', 'HARDWARE', 'Choosing a Replacement Laptop Charger', 'All brands', '', NULL, '/tips/hw-replacement-laptop-charger.jpg',
$tip$The wrong charger can fail to charge, overheat or damage the laptop.

1. Match the voltage on the original label exactly (for example 19.5V).
2. Watts or amps must be the same or higher, never lower.
3. Check the plug tip size and type. Some brands use a centre pin to identify the charger, and the laptop won't charge without it.
4. For USB-C laptops, get a USB-C PD charger with enough watts.
5. Avoid very cheap copies: they often lack protection and run very hot.

Write the laptop model on the receipt so the customer can return a wrong charger.$tip$,
ARRAY['Multimeter'], now() - interval '28 minutes'),

('hardware-tip-tablet-not-charging', 'HARDWARE', 'Tablet Not Charging or Charging Slowly', 'All brands', '', NULL, '/tips/hw-tablet-not-charging.jpg',
$tip$Tablets have bigger batteries than phones and need more power to charge.

1. Use a wall charger of at least 2A or 10W. Phone chargers may charge a tablet very slowly or not at all while it is in use.
2. Try another cable. Long thin cables lose power.
3. Clean the charging port with a wooden toothpick.
4. Let a fully flat tablet charge for an hour before expecting it to turn on.
5. Check with a USB meter how much current it takes.
6. If the plug feels loose in every cable, the port is worn and needs replacing.

Kids' tablets often have damaged ports from being used while charging. A cable holder or short cable helps.$tip$,
ARRAY['USB meter', 'Known good charger'], now() - interval '30 minutes'),

('hardware-tip-tablet-screen-replacement', 'HARDWARE', 'Tablet Screen Replacement: Touch Glass or Full Assembly', 'All brands', '', NULL, '/tips/hw-tablet-screen-replacement.jpg',
$tip$Many tablets have the touch glass and the display as separate parts. Know which one is broken.

1. If the picture is perfect but the glass is cracked, often only the touch glass (digitizer) needs replacing. It is cheaper.
2. If there are lines, black spots or no picture, the display panel is damaged too.
3. On many newer tablets and iPads, glass and display are one part and must be replaced together.
4. Heat the edges evenly and lift the glass slowly with picks. The display under it is fragile.
5. Clean off all old adhesive and use proper adhesive strips.
6. Test touch and display before sealing.

Tablet glass breaks into many small pieces. Cover it with packing tape before removal.$tip$,
ARRAY['Heat plate or heat gun', 'Opening picks', 'Adhesive strips'], now() - interval '32 minutes'),

('hardware-tip-kids-tablet-care', 'HARDWARE', 'Keeping Kids Tablets Working: Cases, Chargers and Screens', 'All brands', '', NULL, '/tips/hw-kids-tablet-care.jpg',
$tip$Kids' tablets are dropped, chewed and charged in strange ways. A few habits keep them going longer.

1. Use a thick shockproof case with a handle. It takes most drops.
2. Fit a tempered glass screen protector.
3. Charge with the right charger and don't let children play while it charges, which wears the port.
4. Keep it out of the sun and away from drinks.
5. Set screen time limits and turn on parental controls.
6. Teach children to hold it with two hands and put it down flat.

A broken tablet screen often costs a big part of the tablet's price, so protection is worth it.$tip$,
ARRAY['Shockproof case', 'Screen protector'], now() - interval '34 minutes'),

('hardware-tip-tablet-battery-drain', 'HARDWARE', 'Tablet Battery Draining Fast', 'All brands', '', NULL, '/tips/hw-tablet-battery-drain.jpg',
$tip$A tablet that loses charge quickly may have a worn battery or apps using power in the background.

1. Check Battery settings to see which apps use the most power.
2. Lower screen brightness. The big screen uses most of the power.
3. Turn off Bluetooth and location when not needed.
4. Update the tablet and the apps.
5. If it drains overnight even when unused, check for apps running in the background, or reset it after a backup.
6. If the tablet is old, dies at 20% or the case is lifting, the battery is worn or swollen. Replace it.

Store tablets you don't use with about half charge, and charge them every few months.$tip$,
ARRAY[]::text[], now() - interval '36 minutes'),

('hardware-tip-tablet-stylus-not-working', 'HARDWARE', 'Stylus Not Working on a Tablet', 'All brands', '', NULL, '/tips/hw-tablet-stylus-not-working.jpg',
$tip$There are two kinds of stylus: simple rubber tip pens that work on any touch screen, and active pens that only work with certain tablets.

1. Check the pen is made for this tablet model. An Apple Pencil or S Pen won't work on just any tablet.
2. Charge or replace the pen's battery if it has one.
3. Pair it again in Bluetooth settings.
4. Replace a worn or loose pen tip.
5. Remove thick screen protectors, which can block active pens.
6. If the pen works on another tablet but not this one, the tablet's pen layer may be damaged, often after a screen replacement with a copy screen.

Some cheap replacement screens don't support pen input at all.$tip$,
ARRAY[]::text[], now() - interval '38 minutes'),

('hardware-tip-ipad-touch-after-drop', 'HARDWARE', 'iPad Touch Problems After a Drop', 'Apple', 'iPad', NULL, '/tips/hw-ipad-touch-after-drop.jpg',
$tip$An iPad that won't respond to touch in some areas, or taps by itself after a drop, usually has a damaged touch glass or connector.

1. Remove the case and screen protector and restart the iPad.
2. Check for small cracks at the corners. A tiny crack can stop touch in a whole strip.
3. On older iPads with separate glass, replacing the touch glass fixes most touch faults.
4. On newer iPads with the glass and display bonded, the whole screen needs replacing.
5. If touch fails after a repair, check the connector is fully seated.

Note that some iPad models have touch circuits on the board, so heavy drops can cause board faults too.$tip$,
ARRAY['Heat plate', 'Opening picks'], now() - interval '40 minutes'),

('hardware-tip-tablet-keyboard-cover', 'HARDWARE', 'Tablet Keyboard Cover Not Connecting', 'All brands', '', NULL, '/tips/hw-tablet-keyboard-cover.jpg',
$tip$Keyboard covers connect by Bluetooth or by small metal contacts on the edge.

For contact keyboards:
1. Clean the gold contacts on both the tablet and the keyboard with a little isopropyl alcohol.
2. Check the magnets line up and the tablet sits fully in place.
3. Look for bent or dirty pins.

For Bluetooth keyboards:
1. Charge the keyboard.
2. Remove it from Bluetooth settings and pair it again.
3. Keep it away from other paired devices.

If the keyboard works on another tablet but not this one, the tablet's connector or its circuit may be damaged.$tip$,
ARRAY['Isopropyl alcohol', 'Cotton bud'], now() - interval '42 minutes'),

('hardware-tip-earbuds-one-side-not-working', 'HARDWARE', 'Wireless Earbuds: One Side Not Working', 'All brands', '', NULL, '/tips/hw-earbuds-one-side-not-working.jpg',
$tip$When only one earbud plays, it is usually a pairing or charging problem, not a broken earbud.

1. Put both earbuds in the case, close it for 30 seconds, then take them out again.
2. Check the dead earbud is charging: clean its metal contacts and the contacts in the case.
3. Clean the speaker mesh gently with a dry soft brush. Earwax blocks sound.
4. Check the sound balance setting on the phone is in the middle.
5. Forget the earbuds in Bluetooth settings, reset them (see the maker's instructions) and pair again.
6. If one side still won't charge or connect, its battery may be dead.

Most earbuds can't be opened without breaking them, so a dead single earbud is usually replaced.$tip$,
ARRAY['Cotton bud', 'Soft brush'], now() - interval '44 minutes'),

('hardware-tip-earbuds-case-not-charging', 'HARDWARE', 'Earbuds Case Not Charging', 'All brands', '', NULL, '/tips/hw-earbuds-case-not-charging.jpg',
$tip$If the earbuds case won't charge, check the port and cable first.

1. Try another cable and charger.
2. Clean lint from the case's charging port with a wooden toothpick.
3. Leave it charging for 30 minutes. A fully flat case may show no light at first.
4. If the case supports wireless charging, try a wireless pad to see if the case itself works.
5. Check that the earbuds sit fully in the case and the lid closes.
6. A case that gets hot or swells should not be used.

Replacement cases are sold for many popular earbuds and are cheaper than a new set.$tip$,
ARRAY['Wooden toothpick', 'Known good cable'], now() - interval '46 minutes'),

('hardware-tip-cleaning-earbuds', 'HARDWARE', 'Cleaning Earbuds Safely', 'All brands', '', NULL, '/tips/hw-cleaning-earbuds.jpg',
$tip$Dirty earbuds sound weak and can cause ear infections.

1. Remove the silicone tips and wash them in mild soapy water. Dry them fully before refitting.
2. Brush the speaker mesh with a dry soft brush, holding the earbud facing down so dirt falls out.
3. Press a small piece of blue tack on the mesh and lift it off to pull out wax.
4. Wipe the outside with a cloth lightly dampened with isopropyl alcohol.
5. Clean the case's metal contacts with a dry cotton bud.
6. Never run water into the earbuds or push sharp objects into the mesh.

Clean them weekly if you use them every day.$tip$,
ARRAY['Soft brush', 'Cotton bud', 'Isopropyl alcohol', 'Blue tack'], now() - interval '48 minutes'),

('hardware-tip-wired-earphones-one-side', 'HARDWARE', 'Wired Earphones Working on One Side Only', 'All brands', '', NULL, '/tips/hw-wired-earphones-one-side.jpg',
$tip$Find out if the earphones or the phone is the problem.

1. Try the earphones on another phone. If one side is still silent, the earphones are damaged.
2. Try another set on your phone. If they also play one side, the phone's jack or settings are the problem.
3. Check the sound balance setting and turn off mono audio.
4. Clean lint out of the headphone jack with a wooden toothpick.
5. Wiggle the cable near the plug while music plays. Crackles mean a broken wire there.

Earphone wires usually break at the plug or where they split. Cheap sets are best replaced.$tip$,
ARRAY['Another set of earphones'], now() - interval '50 minutes')
ON CONFLICT ("id") DO NOTHING;
