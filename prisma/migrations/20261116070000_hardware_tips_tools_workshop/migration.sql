-- One-time content load (no schema change): 25 hardware tips on board repair, tools and workshop practice,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-emmc-ufs-storage-chips', 'HARDWARE', 'eMMC and UFS Storage Chips: What Technicians Should Know', 'All brands', '', NULL, '/tips/hw-emmc-ufs-storage-chips.jpg',
$tip$The storage chip holds the phone's software and the owner's data. Knowing its type helps with diagnosis.

eMMC: older and budget phones. Slower. Many service tools can read and write it directly through test points (ISP).
UFS: newer and faster phones. Needs tools that support UFS, and is harder to work on.

Signs of a failing storage chip:
1. Boot loops that return after flashing.
2. Very slow phone even after a reset.
3. Flashing fails at the same point every time.
4. Errors about storage or "corrupt data" at startup.

Important:
1. On modern phones, data is encrypted and tied to the original CPU. Moving a storage chip to another board usually does not recover the data.
2. Replacing a storage chip needs the right firmware written to it afterwards.

Only work on phones whose owner has given permission, and keep customer data private.$tip$,
ARRAY['Flashing box with eMMC/UFS support', 'Hot air station'], now() - interval '152 minutes'),

('hardware-tip-no-power-checklist', 'HARDWARE', 'No Power Checklist Before You Open the Board', 'All brands', '', NULL, '/tips/hw-no-power-checklist.jpg',
$tip$Many "dead" phones are fixed without any board work. Check in this order:

1. Charge for at least 30 minutes with a known good charger. Deeply flat batteries take time to show anything.
2. Try a force restart (usually power plus volume down for 10 to 20 seconds).
3. Connect to a computer and see if it is detected in any mode.
4. Check if the screen is the problem: does it vibrate, ring or get warm?
5. Try a known good battery.
6. Test the power button and its flex.
7. Check the battery connector and charging port for corrosion.
8. Only then connect a DC power supply and look at the current draw (see our power supply tip).

Writing each check on the job card saves time if the phone comes back later.$tip$,
ARRAY['Known good battery', 'Charger and cable', 'DC power supply', 'Multimeter'], now() - interval '154 minutes'),

('hardware-tip-too-much-heat-kills-chips', 'HARDWARE', 'Too Much Heat Kills Chips: Avoiding Board Damage', 'All brands', '', NULL, '/tips/hw-too-much-heat-kills-chips.jpg',
$tip$Most board damage during repairs comes from too much heat for too long.

1. Use the lowest temperature that does the job, and more airflow or flux rather than more heat.
2. Shield nearby parts with heat resistant tape or foil, especially plastic connectors, cameras, the SIM reader and the battery area.
3. Remove the battery and any plastic parts before using hot air.
4. Never point hot air at the same spot for minutes. If solder doesn't melt, check your technique.
5. Use a preheater for big boards so the top heat can be lower.
6. Let the board cool naturally. Don't blow cold air on it or put it in water.

Lifted pads, bubbled boards and dead CPUs are usually caused by heat. Patience protects the board.$tip$,
ARRAY['Hot air station', 'Heat resistant tape', 'Thermometer'], now() - interval '156 minutes'),

('hardware-tip-schematics-and-board-views', 'HARDWARE', 'Using Schematics and Board Views to Find Faults', 'All brands', '', NULL, '/tips/hw-schematics-and-board-views.jpg',
$tip$A schematic shows how circuits connect. A board view shows where each part sits on the real board. Together they save hours.

1. Find the faulty function first (no charging, no display, no power).
2. In the schematic, find that circuit and the main lines feeding it.
3. In the board view, click a line to see every part on it highlighted.
4. Measure those points with a multimeter and compare with expected values or a good board.
5. Follow the line from the source (battery, charger) to the part that needs it, checking each step.

Tips:
1. Learn common line names like VBAT, VBUS, VCC_MAIN, PP_ for iPhone, and LDO for small power lines.
2. Keep notes of normal readings for models you often repair.

Board view tools are often sold as a subscription. For a busy shop, they quickly pay for themselves.$tip$,
ARRAY['Schematic', 'Board view software', 'Multimeter'], now() - interval '158 minutes'),

('hardware-tip-removing-underfill-glue', 'HARDWARE', 'Removing Underfill Glue Around Chips Safely', 'All brands', '', NULL, '/tips/hw-removing-underfill-glue.jpg',
$tip$Many phones have hard glue (underfill) around and under chips to protect them from drops. It makes chip work much harder.

1. Use a microscope. Underfill sits right next to tiny parts and traces.
2. Apply a little underfill remover around the chip if you have it, and wait as the product says.
3. Warm the area gently with hot air to soften the glue.
4. Scrape slowly with a fine blade, moving away from the chip, not into the board.
5. Don't lift the chip until the solder underneath has fully melted. Forcing it rips pads off.
6. After removing the chip, clean leftover glue from the pads before putting a new or reballed chip back.

Underfilled CPU and storage work has a high risk. Tell the customer before you start.$tip$,
ARRAY['Hot air station', 'Underfill remover', 'Fine blade or scraper', 'Microscope'], now() - interval '160 minutes'),

('hardware-tip-microscope-setup', 'HARDWARE', 'Set Up a Microscope for Phone Work', 'All brands', '', NULL, '/tips/hw-microscope-setup.jpg',
$tip$A stereo microscope is the most important tool for board level repairs.

1. Choose a stereo (two eyepiece or trinocular) microscope with about 7x to 45x zoom. It gives depth, so you can solder under it.
2. Fit an LED ring light for even, shadow free light.
3. Set the working distance so you have room for the soldering iron and tweezers (about 10cm or more).
4. Adjust the eyepieces to your eye distance and focus each one separately.
5. Use a boom or arm stand to move it over a big workspace.
6. Keep the lens clean and cover it when not in use. Flux smoke settles on it.
7. A camera on a trinocular port lets you show customers the damage.

Start at low zoom to find the area, then zoom in to work.$tip$,
ARRAY['Stereo microscope', 'LED ring light', 'Boom stand'], now() - interval '162 minutes'),

('hardware-tip-hot-air-station-settings', 'HARDWARE', 'Hot Air Station Settings: Temperature and Airflow', 'All brands', '', NULL, '/tips/hw-hot-air-station-settings.jpg',
$tip$There is no single right setting: it depends on the station, the nozzle and the part. These are starting points.

1. Small capacitors and resistors: about 300 to 350°C, low airflow, small nozzle.
2. Connectors and small chips: about 330 to 380°C, medium airflow.
3. Larger chips and shields: about 350 to 400°C with a preheater under the board.

Good habits:
1. Always add flux before heating.
2. Hold the nozzle a few centimetres above and keep it moving in small circles.
3. Use low airflow near tiny parts so you don't blow them away.
4. Test your station on a dead board: displayed and real temperatures often differ.
5. Let the station cool down in its holder before switching off, if it has a cool down mode.

Too much heat for too long damages the board more than slightly low heat with patience.$tip$,
ARRAY['Hot air station', 'Nozzles', 'Flux'], now() - interval '164 minutes'),

('hardware-tip-soldering-iron-and-tip-care', 'HARDWARE', 'Choosing a Soldering Iron and Keeping the Tip Alive', 'All brands', '', NULL, '/tips/hw-soldering-iron-and-tip-care.jpg',
$tip$A good iron and a clean tip make phone soldering much easier.

Choosing:
1. Get a temperature controlled station, not a plain plug in iron.
2. Fast heat up stations with replaceable cartridge tips are excellent for phone boards.
3. Have a few tip shapes: fine conical for small joints, knife or bevel for drag soldering and cleaning pads.

Tip care:
1. Clean the tip on brass wool, not a soaking wet sponge.
2. Keep a little solder on the tip when it is resting. A bare tip oxidises and stops taking solder.
3. Turn the temperature down or use sleep mode when not working.
4. Never file or sand a plated tip.
5. Use tip tinner to revive a tip that won't take solder.

Tips are consumables. Replace them when they won't tin any more.$tip$,
ARRAY['Soldering station', 'Brass tip cleaner', 'Tip tinner'], now() - interval '166 minutes'),

('hardware-tip-esd-mats-wrist-straps', 'HARDWARE', 'Static Electricity: ESD Mats and Wrist Straps', 'All brands', '', NULL, '/tips/hw-esd-mats-wrist-straps.jpg',
$tip$A static spark you can't even feel can damage chips on a phone board.

1. Work on an ESD mat connected to ground.
2. Wear a wrist strap connected to the same ground point.
3. Use ESD safe tweezers, brushes and trays.
4. Keep plastic bags, foam and synthetic cloths away from open boards.
5. Store loose boards and screens in anti static bags.
6. Dry air increases static. Be extra careful in dry, windy months.

If you don't have proper grounding in the shop, have an electrician check it. An ESD mat connected to nothing does little.$tip$,
ARRAY['ESD mat', 'Wrist strap', 'Ground connection'], now() - interval '168 minutes'),

('hardware-tip-phone-screwdrivers', 'HARDWARE', 'The Right Screwdrivers for Phones: Pentalobe, Tri-Point and Phillips', 'All brands', '', NULL, '/tips/hw-phone-screwdrivers.jpg',
$tip$Using the wrong screwdriver strips screws, and stripped screws can turn a quick job into a long one.

Common phone screws:
Phillips (PH000, PH00): most Android phones and many internal screws.
Pentalobe (P2): the bottom screws on iPhones.
Tri-point (Y000): inside many iPhones, around the battery and screen brackets.
Torx (T2, T3, T5): some Android phones, laptops and game controllers.

Tips:
1. Buy a quality set with hardened bits. Cheap bits round off quickly.
2. Press down firmly and turn slowly.
3. Replace worn bits straight away.
4. Never force a stuck screw: use the right bit and a little heat if there is thread lock.

A magnetic tip helps lift tiny screws, but keep magnets away from compasses and some sensors.$tip$,
ARRAY['Precision screwdriver set'], now() - interval '170 minutes'),

('hardware-tip-multimeter-basics', 'HARDWARE', 'Multimeter Basics: Voltage, Continuity and Diode Mode', 'All brands', '', NULL, '/tips/hw-multimeter-basics.jpg',
$tip$A multimeter is the first tool for checking power and connections.

DC voltage: measures voltage on a live circuit. Use it to check batteries (about 3.7 to 4.4V), chargers (5V) and power lines.
Continuity: beeps when two points are connected. Use it for cables, flex cables, buttons and fuses. Always on a powered off board.
Diode mode: shows a value for each point on a board compared with ground. Compare with a known good board to find faults. A reading near 0 means a short.
Resistance: useful for speakers, motors and some parts.

Safe habits:
1. Remove the battery before diode or continuity tests.
2. Put the black probe on ground (a shield or screw hole).
3. Use fine, sharp probes for phone boards.

Keep a note of normal diode readings for the models you repair often.$tip$,
ARRAY['Digital multimeter'], now() - interval '172 minutes'),

('hardware-tip-phone-repair-workbench-setup', 'HARDWARE', 'Setting Up a Phone Repair Workbench', 'All brands', '', NULL, '/tips/hw-phone-repair-workbench-setup.jpg',
$tip$A tidy, well set up bench makes repairs faster and safer.

Essentials:
1. A sturdy table at a comfortable height, with a good chair.
2. ESD mat and wrist strap.
3. Bright, even lighting (LED panel or ring light).
4. Screwdriver set, opening tools, tweezers and suction cups.
5. Multimeter, USB meter and DC power supply.
6. Soldering station and hot air station on their own holders, away from cables.
7. Microscope for board work.
8. Fume extractor or fan blowing flux smoke away from your face.
9. Fire extinguisher and a metal tray for damaged batteries.

Organisation:
1. Use a magnetic screw mat for each phone.
2. Keep each customer's phone and parts in a labelled tray.
3. Clean the bench at the end of the day: loose screws and solder balls cause shorts.$tip$,
ARRAY['ESD mat', 'Microscope', 'Soldering and hot air station', 'Fume extractor'], now() - interval '174 minutes'),

('hardware-tip-tweezers-spudgers-picks', 'HARDWARE', 'Tweezers, Spudgers and Picks: Which to Use Where', 'All brands', '', NULL, '/tips/hw-tweezers-spudgers-picks.jpg',
$tip$Using the right small tool prevents torn flexes and scratched frames.

Plastic opening picks: for separating screens and back covers. Thin and flexible.
Nylon or plastic spudger: for disconnecting connectors and prying gently near the board.
Metal spudger: only for strong prying away from batteries and flex cables.
Curved tweezers: for holding small parts and removing stickers.
Fine pointed tweezers: for capacitors and small parts under the microscope.
Suction cup: for lifting screens and back glass after heating.

Tips:
1. Never use metal tools near batteries.
2. Lift connectors straight up from the edge, not by pulling the flex.
3. Keep tweezers straight. Bent tips drop parts.

A good basic set doesn't cost much and pays back in fewer broken parts.$tip$,
ARRAY['ESD tweezers', 'Nylon spudger', 'Opening picks', 'Suction cup'], now() - interval '176 minutes'),

('hardware-tip-isopropyl-alcohol-repairs', 'HARDWARE', 'Isopropyl Alcohol in Repairs: Why 99% Beats 70%', 'All brands', '', NULL, '/tips/hw-isopropyl-alcohol-repairs.jpg',
$tip$Isopropyl alcohol (IPA) is used to clean boards, remove flux and soften glue.

Why 99%:
1. It evaporates fast and leaves almost nothing behind.
2. 70% alcohol is 30% water. On a board, that water can cause corrosion and shorts.

Good uses:
1. Cleaning flux after soldering.
2. Cleaning corrosion on water damaged boards.
3. Softening battery and screen glue.
4. Cleaning screens before fitting a protector.

Safety:
1. It is flammable. Keep it away from hot air and the soldering iron flame.
2. Use in a ventilated place.
3. Never use it on a powered board. Disconnect the battery first and let it dry fully.

Store it in a closed bottle: it absorbs moisture from the air when left open.$tip$,
ARRAY['99% isopropyl alcohol', 'ESD brush'], now() - interval '178 minutes'),

('hardware-tip-uv-glue-curing-lamps', 'HARDWARE', 'UV Glue and Curing Lamps: Tips for Clean Results', 'All brands', '', NULL, '/tips/hw-uv-glue-curing-lamps.jpg',
$tip$UV glue stays liquid until UV light hardens it. It is used for jumper wires, solder mask and some screen work.

1. Use the right type: UV solder mask for protecting jumpers and repaired pads, LOCA for laminating glass.
2. Apply a thin layer. Thick layers cure on top but stay soft underneath.
3. Cure with a proper UV lamp for the time the product says, usually a few minutes.
4. Keep UV glue away from the display panel unless that's what it's for.
5. Protect your eyes: don't look at the UV lamp directly.
6. Store UV glue in a dark place, closed. Light slowly hardens it in the bottle.

Wipe up excess with isopropyl alcohol before curing. It is very hard to remove afterwards.$tip$,
ARRAY['UV glue (LOCA or solder mask)', 'UV lamp'], now() - interval '180 minutes'),

('hardware-tip-lighting-and-magnification', 'HARDWARE', 'Good Lighting and Magnification Without a Microscope', 'All brands', '', NULL, '/tips/hw-lighting-and-magnification.jpg',
$tip$Not every job needs a microscope, but every job needs good light.

1. Use a bright, cool white LED lamp above the work.
2. A magnifying lamp (ring light with a lens) is great for screen, battery and port jobs.
3. A head magnifier frees both hands for small screws and flex cables.
4. Phone camera zoom works in a pinch to inspect a connector or a corrosion spot.
5. Avoid working with light behind you: your own shadow hides the work.
6. Rest your eyes for a minute every half hour of close work.

For soldering small parts, a microscope is still best (see our microscope setup tip).$tip$,
ARRAY['LED desk lamp', 'Magnifying lamp', 'Head magnifier'], now() - interval '182 minutes'),

('hardware-tip-keep-track-tiny-screws', 'HARDWARE', 'Keep Track of Tiny Screws with a Magnetic Mat', 'All brands', '', NULL, '/tips/hw-keep-track-tiny-screws.jpg',
$tip$Putting a long screw in the wrong hole can pierce the board under it, especially on iPhones. Organising screws prevents this.

1. Use a magnetic mat you can write on. Draw the phone's outline and put each screw where it came from.
2. Or take a photo of the phone before removing screws, and lay them on a mat in the same pattern.
3. Keep screws from different phones in separate trays.
4. Measure any screw you're unsure about against its partner. Similar looking screws can differ by a millimetre.
5. Replace missing or stripped screws with the correct size, not "close enough".
6. Never use a long screw in a short hole.

A few seconds of order saves a damaged board.$tip$,
ARRAY['Magnetic screw mat', 'Marker', 'Parts trays'], now() - interval '184 minutes'),

('hardware-tip-bench-power-supply', 'HARDWARE', 'Choosing a Bench Power Supply for Phone Repair', 'All brands', '', NULL, '/tips/hw-bench-power-supply.jpg',
$tip$A DC bench power supply lets you power a phone without its battery and see how much current it draws.

What to look for:
1. Adjustable voltage from 0 to at least 15V, and current up to 3 to 5A.
2. A clear display that shows current to two or three decimal places (for example 0.025A).
3. Current limit setting so you don't burn a shorted board.
4. Stable output without big jumps when you change settings.

Accessories:
1. Boot cables or clips for common phone battery connectors.
2. Good probes for injecting voltage into shorted lines.

Uses:
1. Diagnosing dead phones.
2. Finding shorts by injecting voltage.
3. Testing a board after repair before fitting a battery.

Set the current limit before connecting anything.$tip$,
ARRAY['DC power supply', 'Boot cable'], now() - interval '186 minutes'),

('hardware-tip-preheaters-board-work', 'HARDWARE', 'Preheaters for Board Work: When You Need One', 'All brands', '', NULL, '/tips/hw-preheaters-board-work.jpg',
$tip$A preheater warms the whole board from below so you need less hot air from above.

When it helps:
1. Removing and fitting large chips and connectors.
2. Reballing CPU or storage chips.
3. Removing underfilled parts.
4. Working on thick boards that soak up heat.

Tips:
1. Warm the board slowly to about 120 to 180°C, as needed for the job.
2. Remove the battery, cameras and any plastic parts first.
3. Use a board holder that keeps the board level and stable.
4. Don't leave the board on the preheater longer than needed.
5. Let it cool slowly afterwards.

Even heat reduces warping and lifted pads, especially on stacked (sandwich) boards.$tip$,
ARRAY['Preheater', 'Board holder', 'Hot air station'], now() - interval '188 minutes'),

('hardware-tip-solder-wire-paste-wick', 'HARDWARE', 'Solder Wire, Paste and Wick: A Quick Guide', 'All brands', '', NULL, '/tips/hw-solder-wire-paste-wick.jpg',
$tip$The right solder and wick make phone work cleaner.

Solder wire: thin wire (0.3 to 0.5mm) is best for phone boards. Leaded solder melts at a lower temperature and flows more easily than lead free.
Solder paste: tiny solder balls in flux. Used with stencils for reballing and for fitting small chips.
Low temperature paste: melts at a lower temperature. Useful for stacked boards and heat sensitive parts.
Solder wick: copper braid that soaks up old solder when heated. Used to clean pads.

Tips:
1. Add flux before using wick, and don't rub hard: you can lift pads.
2. Keep solder paste in a cool place and close it after use.
3. Wash hands after handling leaded solder, and don't eat at the bench.

Clean all flux residue at the end with isopropyl alcohol.$tip$,
ARRAY['Thin solder wire', 'Low temperature solder paste', 'Solder wick', 'Flux'], now() - interval '190 minutes'),

('hardware-tip-workshop-safety', 'HARDWARE', 'Workshop Safety: Fumes, Burns and Fire', 'All brands', '', NULL, '/tips/hw-workshop-safety.jpg',
$tip$A repair shop has heat, chemicals and lithium batteries in one place. A few habits keep everyone safe.

1. Use a fume extractor or a fan that blows flux smoke away from your face.
2. Keep the soldering iron in its stand and switch off stations at the end of the day.
3. Keep alcohol, glue and cleaning sprays away from hot air and irons.
4. Store damaged or swollen batteries in a metal tray or sand.
5. Keep a CO2 or powder fire extinguisher within reach, and know how to use it.
6. Have a first aid kit for small burns and cuts. Cool burns under clean running water.
7. Wash hands after work, especially after using leaded solder.
8. Don't let children play near the bench.

A safe shop is also a shop customers trust.$tip$,
ARRAY['Fume extractor', 'Fire extinguisher', 'Metal tray', 'First aid kit'], now() - interval '192 minutes'),

('hardware-tip-diagnose-before-quoting', 'HARDWARE', 'Diagnose Before You Quote: A Simple Intake Routine', 'All brands', '', NULL, '/tips/hw-diagnose-before-quoting.jpg',
$tip$Quoting before checking leads to arguments when the real fault is different.

1. Ask what happened (drop, water, update, sudden).
2. Test and write down what works: screen, touch, cameras, speakers, mic, charging, buttons, SIM, Wi-Fi, fingerprint, Face ID.
3. Note visible damage: cracks, bent frame, missing screws, water marks.
4. Ask if the customer wants their data kept, and if they have a backup.
5. Give a diagnosis price if opening is needed, and a range for possible repairs.
6. Call the customer with the final price before doing extra work.
7. Give a receipt with the repair, warranty and what was already faulty.

A clear job card protects both the customer and the shop.$tip$,
ARRAY['Job card', 'Test SIM', 'Known good charger'], now() - interval '194 minutes'),

('hardware-tip-protecting-customer-data', 'HARDWARE', 'Protecting Customer Data During Repairs', 'All brands', '', NULL, '/tips/hw-protecting-customer-data.jpg',
$tip$Customers hand over phones full of photos, messages and mobile money apps. Respecting that builds trust.

1. Ask the customer to back up important data before a repair whenever possible.
2. Only ask for the screen lock if the repair needs testing with the phone unlocked. Many repairs can be tested from the lock screen.
3. Never open photos, messages, gallery or money apps.
4. Don't copy any data to your computer unless the customer asks you to, and delete it afterwards.
5. Keep phones in a locked drawer, not on the counter.
6. Return any removed memory card or SIM to the customer with the phone.
7. Train staff on these rules.

Never help anyone access a phone that isn't theirs.$tip$,
ARRAY[]::text[], now() - interval '196 minutes'),

('hardware-tip-used-phone-hardware-checks', 'HARDWARE', 'Buying a Used Phone: Hardware Checks in 5 Minutes', 'All brands', '', NULL, '/tips/hw-used-phone-hardware-checks.jpg',
$tip$A quick check before paying saves you from hidden faults.

1. Look for a lifting screen or back (swollen battery) and a bent frame.
2. Check the screen on white and black backgrounds for spots, lines and burn-in.
3. Test touch across the whole screen.
4. Test front and back cameras, including focus and flash.
5. Make a call: test earpiece, microphone and speaker.
6. Insert your SIM and check it gets network in both slots.
7. Plug in a charger and check it charges.
8. Test fingerprint or face unlock, Wi-Fi, Bluetooth and all buttons.
9. Check the IMEI matches the box, and make sure the phone is not locked to someone else's account. Ask the seller to sign out in front of you.
10. Check battery health.

Avoid phones with a missing or mismatched IMEI, or a seller who can't remove their account.$tip$,
ARRAY['SIM card', 'Charger', 'Headphones'], now() - interval '198 minutes'),

('hardware-tip-original-oem-copy-parts', 'HARDWARE', 'Original, OEM and Copy Parts: What the Labels Mean', 'All brands', '', NULL, '/tips/hw-original-oem-copy-parts.jpg',
$tip$Suppliers use many labels for parts. Knowing what they mean helps you quote fairly and avoid comebacks.

Original or genuine: made by or for the phone brand, often from official service channels. Best fit and quality.
Service pack: original part sold by the brand to repair centres, often with frame or adhesive included.
OEM: made by the same factory that supplies the brand, but not through official channels. Quality is usually good, but there are fakes.
Refurbished or "original pulled": an original part taken from another phone and cleaned or relaminated.
Copy or aftermarket: made by other factories. Quality ranges from good to poor.

Tips:
1. Ask suppliers for a warranty and test before fitting.
2. Tell customers which grade they are getting and why the price differs.
3. Keep a note of suppliers whose parts gave problems.

Honest labels build long term customers.$tip$,
ARRAY[]::text[], now() - interval '200 minutes')
ON CONFLICT ("id") DO NOTHING;
