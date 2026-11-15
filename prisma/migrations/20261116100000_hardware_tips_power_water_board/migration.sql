-- One-time content load (no schema change): 25 hardware tips on batteries, charging, water damage and board repair,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-new-screen-colour-tint', 'HARDWARE', 'Yellow or Blue Tint on a New Screen', 'All brands', '', NULL, '/tips/hw-new-screen-colour-tint.jpg',
$tip$A replacement screen can look warmer, cooler or duller than the original.

1. Check the display settings: turn off night light, eye comfort or warm modes, and reset colour mode to default.
2. On iPhones, a screen without its data copied may lose True Tone (see our True Tone tip).
3. Compare with a white image at full brightness.
4. Copy screens, especially incell and TFT, often have a slightly different colour. That is a limit of the part, not a fitting mistake.
5. A pink, green or patchy tint that changes when you press the screen means damage. Return it to the supplier.

Tell the customer before fitting if a cheaper screen will look a bit different.$tip$,
ARRAY[]::text[], now() - interval '100 minutes'),

('hardware-tip-auto-brightness-after-screen-swap', 'HARDWARE', 'Auto Brightness Not Working After a Screen Swap', 'All brands', '', NULL, '/tips/hw-auto-brightness-after-screen-swap.jpg',
$tip$Auto brightness uses a light sensor near the top of the screen. After a screen swap it can stop working.

1. Turn auto brightness off and on again, then restart.
2. Check the light sensor's holder and rubber were moved from the old screen.
3. Make sure the sensor flex wasn't torn or left unplugged.
4. Some copy screens are too dark over the sensor area. Try another screen.
5. On iPhones, the earpiece flex that holds the sensors must be moved carefully from the original screen.

Test auto brightness every time before closing the phone after a screen repair.$tip$,
ARRAY['Screwdriver set'], now() - interval '102 minutes'),

('hardware-tip-dust-under-screen-protector', 'HARDWARE', 'Dust Under a New Screen Protector or Glass', 'All brands', '', NULL, '/tips/hw-dust-under-screen-protector.jpg',
$tip$Dust specks under a protector or a new glass look bad and cause bubbles.

For screen protectors:
1. Lift the protector corner nearest the dust with a dust sticker.
2. Touch the dust with another sticker to pick it up.
3. Lay the protector back down slowly and push out air with a card.

To avoid dust in the first place:
1. Work in a clean, still room, away from fans.
2. Wipe the screen with alcohol, then dry cloth, then dust stickers.
3. Keep the protector's backing on until the last second.

On glass repairs, dust under the glass needs a dust free bench and is very hard to remove afterwards.$tip$,
ARRAY['Dust stickers', 'Microfibre cloth', 'Plastic card'], now() - interval '104 minutes'),

('hardware-tip-screen-lifting-at-edges', 'HARDWARE', 'Screen Lifting at the Edges', 'All brands', '', NULL, '/tips/hw-screen-lifting-at-edges.jpg',
$tip$A screen that lifts away from the frame is a warning sign.

1. First check for a swollen battery pushing from behind. This is the most common and most dangerous cause.
2. If the battery is fine, the glue may have failed, often after heat or a repair with too little glue.
3. Check for a bent frame or a loose bracket under the screen.
4. Clean the old glue, apply new adhesive evenly and clamp gently.
5. Don't press a lifting screen back with force. It can crack the display.

A lifted screen lets dust and water in, so fix it soon.$tip$,
ARRAY['Screwdriver set', 'Adhesive', 'Clamps'], now() - interval '106 minutes'),

('hardware-tip-screen-versions-same-phone', 'HARDWARE', 'Same Phone, Different Screen Versions: Check Before Ordering', 'All brands', '', NULL, '/tips/hw-screen-versions-same-phone.jpg',
$tip$Many phone models were made with two or three different screens. The wrong version may not fit or show a picture.

1. Read the exact model number in Settings, About phone, not just the marketing name.
2. Open the phone and compare the flex cable shape, connector position and any code printed on the old screen.
3. Check if the model comes in 4G and 5G versions: they often use different screens.
4. Ask your supplier which version they have, and keep the old screen to compare.
5. Connect and test before removing films or gluing.

Writing the screen code on the job card saves time when the same model comes back.$tip$,
ARRAY[]::text[], now() - interval '108 minutes'),

('hardware-tip-curved-screen-repairs', 'HARDWARE', 'Curved Screen Repairs: Extra Care Needed', 'All brands', '', NULL, '/tips/hw-curved-screen-repairs.jpg',
$tip$Curved edge screens are expensive and break easily during removal.

1. Use even heat and plenty of patience. Curved edges are glued more strongly.
2. Use very thin picks and keep them shallow at the curves, where the display panel is close to the edge.
3. A cracked curved screen often has a damaged display along the edge. Check carefully for lines and touch faults before quoting.
4. Use protectors made for curved screens, with full glue or UV glue, so the edges don't lift.
5. Many curved screens come as service packs with the frame, which is safer to fit.

Tell customers that curved screens cost more and take longer to fix.$tip$,
ARRAY['Heat plate', 'Thin opening picks', 'Adhesive'], now() - interval '110 minutes'),

('hardware-tip-storing-replacement-screens', 'HARDWARE', 'Storing Replacement Screens Without Damage', 'All brands', '', NULL, '/tips/hw-storing-replacement-screens.jpg',
$tip$Screens are fragile and costly. Many get damaged in storage before they are ever fitted.

1. Keep screens in their original boxes or in foam, flat, never standing on edge with weight on them.
2. Don't stack heavy items on screen boxes.
3. Keep them away from heat and sunlight. OLED and glue can be damaged by heat.
4. Label each box with the model and version.
5. Leave protective films on until fitting.
6. Test new stock when it arrives so faulty screens can be returned in time.

Rotate stock: older screens first.$tip$,
ARRAY['Foam boxes', 'Labels'], now() - interval '112 minutes'),

('hardware-tip-screen-separator-machine', 'HARDWARE', 'Do You Need a Screen Separator Machine?', 'All brands', '', NULL, '/tips/hw-screen-separator-machine.jpg',
$tip$A screen separator is a heated plate with suction. It warms the phone evenly so the screen can be lifted safely.

Worth it if:
1. You do several glued screen jobs a day.
2. You often remove curved screens or back glass.

A heat gun is enough if:
1. You do fewer glued jobs.
2. You use it carefully at low heat and keep it moving.

Glass only repairs (replacing just the top glass) need more: a separating wire machine, a laminator, an autoclave for bubbles and a dust free space. Only invest in that if you have the volume.$tip$,
ARRAY['Screen separator', 'Heat plate'], now() - interval '114 minutes'),

('hardware-tip-what-mah-means', 'HARDWARE', 'What mAh Really Means for Battery Life', 'All brands', '', NULL, '/tips/hw-what-mah-means.jpg',
$tip$mAh tells you how much charge a battery holds, but it doesn't tell the whole story.

1. A bigger mAh number usually means longer battery life on the same phone.
2. Different phones use power differently. A 4000mAh phone with an efficient chip can outlast a 5000mAh phone.
3. Screen size, brightness and 5G use a lot of power.
4. Battery health matters: an old 5000mAh battery at 70% health holds about 3500mAh.
5. Power banks lose some charge when transferring, so a 10,000mAh power bank gives roughly 6000 to 7000mAh to the phone.

When customers compare phones, look at real battery life reviews, not only the mAh number.$tip$,
ARRAY[]::text[], now() - interval '116 minutes'),

('hardware-tip-collecting-batteries-recycling', 'HARDWARE', 'Collecting Old Batteries for Recycling in Your Shop', 'All brands', '', NULL, '/tips/hw-collecting-batteries-recycling.jpg',
$tip$A repair shop removes many old batteries. Handling them well protects the shop and the environment.

1. Wear gloves when handling damaged or leaking batteries.
2. Tape over the contacts of each battery.
3. Keep them in a metal box with a lid, away from heat and anything that burns.
4. Keep swollen batteries separate, in sand or a fireproof bag.
5. Find an e-waste collector or electronics recycler and drop off batteries regularly. Don't let them pile up.
6. Offer customers to take their old batteries and phones for recycling.

Never throw lithium batteries into ordinary rubbish or a fire.$tip$,
ARRAY['Gloves', 'Metal box', 'Tape'], now() - interval '118 minutes'),

('hardware-tip-power-banks-on-flights', 'HARDWARE', 'Carrying Power Banks on Flights', 'All brands', '', NULL, '/tips/hw-power-banks-on-flights.jpg',
$tip$Airlines have rules for power banks because lithium batteries can catch fire.

1. Carry power banks in hand luggage only. They are not allowed in checked bags.
2. Most airlines allow power banks up to 100Wh without approval. A 20,000mAh power bank is about 74Wh.
3. Larger ones (100 to 160Wh) usually need airline approval.
4. The capacity should be printed clearly. Banks with no label may be refused.
5. Some airlines don't allow using or charging power banks during the flight.

Check your airline's rules before travelling, as they change.$tip$,
ARRAY[]::text[], now() - interval '120 minutes'),

('hardware-tip-charging-several-devices-power-bank', 'HARDWARE', 'Charging Several Devices from One Power Bank', 'All brands', '', NULL, '/tips/hw-charging-several-devices-power-bank.jpg',
$tip$Many power banks have two or three outputs, but the power is shared.

1. Check the total output on the label. If it says 18W total, two phones charge more slowly together.
2. Charge the device that needs it most first.
3. Use the USB-C port for fast charging. Other ports may be slower.
4. Don't charge a laptop and phones together from a small bank.
5. Expect the bank to run down faster than the printed mAh suggests.

For long trips or power cuts, a 20,000mAh bank with PD output is a good choice.$tip$,
ARRAY[]::text[], now() - interval '122 minutes'),

('hardware-tip-battery-drain-after-drop', 'HARDWARE', 'Phone Battery Draining Fast After a Drop', 'All brands', '', NULL, '/tips/hw-battery-drain-after-drop.jpg',
$tip$If battery life suddenly gets worse after a drop, something may be damaged inside.

1. Check for a swollen or bent battery.
2. Look at Battery settings: if no app is to blame, the problem is likely hardware.
3. Check if the phone gets warm while idle. A warm spot can point to a damaged part.
4. A cracked board part can leak current. A DC power supply shows unusual current when the phone is off or idle.
5. A damaged screen can also use more power.

Board level drain needs a technician with a power supply and thermal camera to find the leaking part.$tip$,
ARRAY['DC power supply', 'Multimeter'], now() - interval '124 minutes'),

('hardware-tip-new-battery-first-days', 'HARDWARE', 'A New Battery''s First Days: What to Expect', 'All brands', '', NULL, '/tips/hw-new-battery-first-days.jpg',
$tip$After a battery replacement, the phone needs time to learn the new battery.

1. The percentage may jump a little in the first few charges.
2. Charge it to 100% once without interruption.
3. Use it normally. You don't need to drain it to 0% repeatedly.
4. Battery life usually settles within a week.
5. If it gets very hot, swells or drains very fast, bring it back. It may be a faulty battery.

Give customers a warranty on batteries and ask them to return early if anything seems wrong.$tip$,
ARRAY[]::text[], now() - interval '126 minutes'),

('hardware-tip-spare-camera-batteries', 'HARDWARE', 'Spare Batteries for Cameras and Other Devices: Storage Tips', 'All brands', '', NULL, '/tips/hw-spare-camera-batteries.jpg',
$tip$Cameras, radios, drones and power tools also use lithium batteries that need care.

1. Store them about half charged if you won't use them for a while.
2. Keep them in a cool, dry place in their covers so contacts can't short.
3. Charge them every few months.
4. Don't leave them in hot cars.
5. Use the right charger for each battery type.
6. Retire batteries that swell, leak or get very hot.

Buying genuine or well reviewed batteries reduces the risk of fires and devices failing.$tip$,
ARRAY[]::text[], now() - interval '128 minutes'),

('hardware-tip-charging-port-repair-signs', 'HARDWARE', 'Charging Port Repair: Signs It Is Time', 'All brands', '', NULL, '/tips/hw-charging-port-repair-signs.jpg',
$tip$A port can be cleaned many times, but eventually it wears out.

Signs it needs replacing:
1. Every cable is loose, even after cleaning.
2. Charging only works at an angle or when holding the cable.
3. The phone shows "moisture detected" when it isn't wet.
4. Visible damage: broken plastic, bent or burnt pins.
5. Data transfer to a computer fails with good cables.

Most phones have the port on a small board that is quick to replace (see our tip on port boards and soldered ports).$tip$,
ARRAY[]::text[], now() - interval '130 minutes'),

('hardware-tip-test-charging-cable', 'HARDWARE', 'Test a Charging Cable in 1 Minute', 'All brands', '', NULL, '/tips/hw-test-charging-cable.jpg',
$tip$Bad cables cause many "phone won't charge" complaints.

1. Look for damage at both ends: fraying, bent plugs or burnt marks.
2. Charge a phone that you know works with the cable and see if the charging icon stays steady.
3. Wiggle the cable near each plug. If charging stops and starts, the cable is damaged.
4. With a USB meter, compare the current with a known good cable. Much lower current means a weak cable.
5. Test data by connecting to a computer. Some cables only charge.

Throw away damaged cables. Exposed wires can short and spark.$tip$,
ARRAY['USB meter', 'Known good charger'], now() - interval '132 minutes'),

('hardware-tip-usb-otg-flash-drive', 'HARDWARE', 'USB OTG: Connect a Flash Drive to Your Phone', 'All brands', '', NULL, '/tips/hw-usb-otg-flash-drive.jpg',
$tip$OTG lets many Android phones read flash drives and use some USB devices.

1. Get an OTG adapter that matches your phone's port (USB-C or micro USB), or a dual flash drive with both plugs.
2. Plug in the flash drive. A notification or the Files app should show it.
3. Some phones need OTG turned on in settings.
4. Use the drive to back up photos or move files without internet.
5. Eject the drive in settings before unplugging it.

Flash drives formatted as NTFS may not show on some phones. FAT32 or exFAT usually works.$tip$,
ARRAY['OTG adapter', 'Flash drive'], now() - interval '134 minutes'),

('hardware-tip-charger-watts-explained', 'HARDWARE', 'Charger Watts Explained: 10W, 18W, 25W and More', 'All brands', '', NULL, '/tips/hw-charger-watts-explained.jpg',
$tip$Watts show how fast a charger can supply power.

1. 5W to 10W: basic chargers. Slow for modern phones.
2. 18W to 25W: fast charging for most phones.
3. 33W to 120W: very fast charging, but only for phones that support it, often with their own brand charger and cable.
4. 45W to 100W USB-C chargers can also charge many laptops.

Important:
1. A phone only takes what it can handle, so a bigger charger is safe if it is good quality.
2. Fast charging needs a matching standard (PD, QC or the brand's own).
3. A good cable is needed for high watts.

A quality charger from a trusted shop is better than the cheapest high watt one.$tip$,
ARRAY[]::text[], now() - interval '136 minutes'),

('hardware-tip-one-charger-phone-and-laptop', 'HARDWARE', 'One Charger for Phone and Laptop', 'All brands', '', NULL, '/tips/hw-one-charger-phone-and-laptop.jpg',
$tip$A good USB-C PD charger can charge a phone, tablet and many laptops.

1. Check your laptop charges over USB-C. Look for a charging symbol by the port or check the manual.
2. Choose a charger with enough watts for the laptop (often 45W to 65W).
3. Use a USB-C cable rated for the power.
4. A charger with two ports shares power between them.
5. Laptops with a round barrel plug need their own charger.

This saves space in a bag and is handy for travel.$tip$,
ARRAY[]::text[], now() - interval '138 minutes'),

('hardware-tip-charging-under-pillow', 'HARDWARE', 'Charging a Phone Under the Pillow: Why It''s Dangerous', 'All brands', '', NULL, '/tips/hw-charging-under-pillow.jpg',
$tip$Phones and chargers give off heat while charging. Under a pillow or blanket the heat can't escape.

1. Heat damages the battery and shortens its life.
2. In rare cases, an overheated battery or cheap charger can start a fire.
3. Charge on a hard surface like a table or the floor.
4. Don't charge on the bed or sofa.
5. Use good quality chargers and cables.
6. Don't charge a phone with a swollen battery at all.

If you use the phone as an alarm, put it on a bedside table, not under your pillow.$tip$,
ARRAY[]::text[], now() - interval '140 minutes'),

('hardware-tip-charging-paused-too-hot', 'HARDWARE', 'Phone Too Hot to Charge: Charging Paused Warnings', 'All brands', '', NULL, '/tips/hw-charging-paused-too-hot.jpg',
$tip$Phones stop charging when the battery is too hot to protect it.

1. Remove the case and move the phone to a cool place, out of the sun.
2. Close games and heavy apps while charging.
3. Turn off hotspot.
4. Don't put it in a fridge.
5. Charging continues once the phone cools down.

If it says it is too hot when it isn't warm at all, the temperature sensor, battery or charging circuit may be faulty. Bring it to a technician.$tip$,
ARRAY[]::text[], now() - interval '142 minutes'),

('hardware-tip-iphone-accessory-not-supported', 'HARDWARE', 'iPhone Says Charging Accessory Not Supported', 'Apple', '', NULL, '/tips/hw-iphone-accessory-not-supported.jpg',
$tip$The "accessory may not be supported" message usually means a cheap cable, dirt or a worn port.

1. Try an original or certified (MFi) cable.
2. Clean the Lightning or USB-C port with a wooden toothpick. Lint is very common.
3. Check the cable's plug for dirt or damaged contacts.
4. Restart the iPhone.
5. If the message also shows with good cables, the port may be worn or corroded and needs replacing.

Cheap uncertified cables often work for a while, then fail after an update.$tip$,
ARRAY['Wooden toothpick', 'Known good cable'], now() - interval '144 minutes'),

('hardware-tip-multi-charging-cables', 'HARDWARE', 'Multi Charging Cables: Handy but Slow', 'All brands', '', NULL, '/tips/hw-multi-charging-cables.jpg',
$tip$3 in 1 cables with micro USB, USB-C and Lightning plugs are handy, but they have limits.

1. They share power, so charging two phones at once is slow.
2. Most don't support fast charging.
3. Many don't transfer data, so they can't be used for flashing or backups.
4. The thin wires get warm with high current.

They are good for emergency charging on the go. For daily charging, a proper cable for each phone is better.$tip$,
ARRAY[]::text[], now() - interval '146 minutes'),

('hardware-tip-humidity-condensation-damage', 'HARDWARE', 'Humidity and Condensation: Hidden Water Damage', 'All brands', '', NULL, '/tips/hw-humidity-condensation-damage.jpg',
$tip$Phones can get water damage without being dropped in water.

1. Taking a phone from a cold air conditioned room into hot, humid air can cause moisture to form inside.
2. Phones kept in steamy kitchens or bathrooms collect moisture over time.
3. Sweaty pockets during exercise add moisture too.

What helps:
1. Let a cold phone warm up before using it in humid air.
2. Keep phones out of bathrooms and away from cooking steam.
3. Store spare phones in a dry place, with silica gel packets in the box.

Corrosion from humidity is slow but causes the same faults as water damage.$tip$,
ARRAY[]::text[], now() - interval '148 minutes')
ON CONFLICT ("id") DO NOTHING;
