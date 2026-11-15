-- One-time content load (no schema change): 25 hardware tips on charging accessories, water damage and board repair,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-car-charging-safely', 'HARDWARE', 'Charging in the Car: Safe Car Chargers and Cables', 'All brands', '', NULL, '/tips/hw-car-charging-safely.jpg',
$tip$Car sockets give power that jumps up and down, especially when the engine starts. Cheap car chargers pass that on to the phone.

1. Use a car charger from a known brand with overvoltage protection.
2. Unplug the phone when starting the engine.
3. Keep the phone out of direct sun on the dashboard. Charging in a hot car wears the battery quickly.
4. Use a short, good quality cable so it doesn't get trapped in doors or seats.
5. For taxi and boda riders charging all day, a good car charger with 18W or more and a holder that allows airflow is worth it.
6. Don't leave a charger plugged into the socket when the car is parked for long. Some keep draining the car battery.

If the car charger gets very hot or smells, stop using it.$tip$,
ARRAY['Car charger', 'Good cable'], now() - interval '102 minutes'),

('hardware-tip-power-cuts-and-surges', 'HARDWARE', 'Power Cuts and Surges: Protect Your Chargers and Phones', 'All brands', '', NULL, '/tips/hw-power-cuts-and-surges.jpg',
$tip$When power returns after a cut, the voltage can jump. Chargers, laptops and phones on charge can be damaged.

1. Plug chargers into an extension with surge protection, not straight into the wall.
2. In areas with unstable power, use a voltage stabiliser or a small UPS for the workbench.
3. Unplug chargers during storms and when power goes off, then plug back in a few minutes after it returns.
4. Don't charge phones on generator power until the generator is running steadily.
5. Replace chargers that were in use during a surge if they now get hot or charge slowly.

In a repair shop, surge protection on the soldering station and power supply protects both tools and customer phones.$tip$,
ARRAY['Surge protector', 'Voltage stabiliser'], now() - interval '104 minutes'),

('hardware-tip-micro-usb-type-c-lightning', 'HARDWARE', 'Micro USB, Type-C or Lightning: Pick the Right Cable', 'All brands', '', NULL, '/tips/hw-micro-usb-type-c-lightning.jpg',
$tip$Using the right cable stops damaged ports and wasted trips.

Micro USB: small, flat, with one side wider than the other. Goes in only one way. Found on older and budget Android phones, speakers and power banks. Forcing it upside down breaks the port.
USB-C (Type-C): oval, goes in either way. Found on most Android phones from the last few years, new iPhones, laptops and new accessories.
Lightning: flat, small and goes in either way. Found on iPhones before iPhone 15, and older iPads and AirPods.

Tips:
1. Look into the phone's port before plugging in.
2. Never force a plug that doesn't slide in easily.
3. A 3 in 1 cable is handy for customers with several phones.

Wrong cables pushed in hard are a common cause of broken charging ports.$tip$,
ARRAY[]::text[], now() - interval '106 minutes'),

('hardware-tip-charging-cable-care', 'HARDWARE', 'Make Charging Cables Last: Stop the Fraying', 'All brands', '', NULL, '/tips/hw-charging-cable-care.jpg',
$tip$Most cables fail at the neck where the wire meets the plug.

1. Pull the plug, not the wire, when unplugging.
2. Don't bend the cable sharply at the plug, for example when using the phone in bed while charging.
3. Wrap cables in loose loops. Tight wrapping around a charger breaks the wires inside.
4. Keep cables out of doors, chair wheels and away from pets.
5. A bit of heat shrink or a spring from an old pen around the neck adds support.
6. Replace cables with exposed wires right away. They can short and spark.

Braided cables last longer than thin plastic ones and are worth the small extra cost.$tip$,
ARRAY[]::text[], now() - interval '108 minutes'),

('hardware-tip-moisture-detected-warning', 'HARDWARE', '"Moisture Detected" Warning on the Charging Port', 'All brands', '', NULL, '/tips/hw-moisture-detected-warning.jpg',
$tip$Many phones block charging when they sense water in the port. This protects the phone from corrosion.

1. Unplug the cable.
2. Tap the phone gently with the port facing down to shake water out.
3. Leave it to dry in an airy place for an hour or two. Don't use a hair dryer on high heat.
4. Don't push cotton buds or tissue into the port.
5. If the phone was never wet and the warning keeps showing, the port may be dirty or corroded. Clean it gently with a brush and a little 99% isopropyl alcohol and let it dry.
6. Restart the phone. Sometimes the warning stays until a restart.

If the warning never goes away, the charging port or its board is likely corroded and needs replacing. Wireless charging, if the phone has it, still works in the meantime.$tip$,
ARRAY['Soft brush', 'Isopropyl alcohol'], now() - interval '110 minutes'),

('hardware-tip-phone-fell-in-water', 'HARDWARE', 'Phone Fell in Water: What to Do in the First 10 Minutes', 'All brands', '', NULL, '/tips/hw-phone-fell-in-water.jpg',
$tip$Speed matters. Most of the damage comes from current flowing through wet parts, and from corrosion later.

1. Take the phone out and switch it off right away. Don't check if it still works.
2. Don't charge it or plug it into anything.
3. Remove the case, SIM tray and memory card.
4. Dry the outside with a cloth and shake water out of the ports gently.
5. Don't heat it with a hair dryer, oven or sun.
6. Bring it to a technician as soon as possible to open it, disconnect the battery and clean the board.

Even if the phone works after drying, corrosion can start inside within days. Professional cleaning soon after is the best chance to save it.

Salt water, tea and soda are worse than clean water. Tell the technician what liquid it was.$tip$,
ARRAY['Dry cloth'], now() - interval '112 minutes'),

('hardware-tip-rice-does-not-fix-wet-phone', 'HARDWARE', 'Why Rice Doesn''t Fix a Wet Phone', 'All brands', '', NULL, '/tips/hw-rice-does-not-fix-wet-phone.jpg',
$tip$Putting a wet phone in rice is popular advice, but it doesn't really help.

1. Rice only dries the outside. Water trapped under shields and chips stays there.
2. While you wait, corrosion starts on the board, especially with the battery connected.
3. Rice dust and starch can get into ports and the speaker.
4. Phone makers themselves advise against using rice.

Better:
1. Switch off, remove SIM and case, and dry the outside.
2. Leave the phone in a dry, airy place with the ports facing down.
3. Best of all, take it to a technician to open it, disconnect the battery and clean the board with alcohol.

The sooner the board is cleaned, the better the chance of saving the phone and the data.$tip$,
ARRAY[]::text[], now() - interval '114 minutes'),

('hardware-tip-cleaning-water-damaged-board', 'HARDWARE', 'Cleaning a Water Damaged Board with Alcohol and a Brush', 'All brands', '', NULL, '/tips/hw-cleaning-water-damaged-board.jpg',
$tip$For technicians: a careful clean saves many water damaged phones.

1. Disconnect the battery first, before anything else.
2. Remove the board and take off any shields you can safely remove.
3. Look under a microscope for white or green corrosion, especially around connectors, filters and the charging area.
4. Scrub gently with a soft brush and 99% isopropyl alcohol. Don't use water or 70% alcohol: they leave water behind.
5. An ultrasonic cleaner with proper board cleaning fluid cleans under chips. Remove the speakers, mic and cameras first.
6. Dry fully, with low heat if needed, before reconnecting the battery.
7. Test with a DC power supply before fitting the battery.

Note which parts were corroded on the job card. Water damaged phones can develop new faults later, so give a limited warranty.$tip$,
ARRAY['99% isopropyl alcohol', 'Soft ESD brush', 'Ultrasonic cleaner (optional)', 'Microscope'], now() - interval '116 minutes'),

('hardware-tip-spotting-board-corrosion', 'HARDWARE', 'Spotting Corrosion on a Phone Board', 'All brands', '', NULL, '/tips/hw-spotting-board-corrosion.jpg',
$tip$Corrosion is the slow damage left after water. It often explains strange faults.

What it looks like:
1. White or grey powder around parts.
2. Green or blue crust on connectors and metal shields.
3. Black or brown marks where parts have burned.
4. Dull, discoloured solder joints.

Where to look first:
1. Battery connector and its filters.
2. Charging port and charging circuit.
3. Screen and camera connectors.
4. Around the SIM reader.

Also check the water damage indicator stickers inside the phone (they turn red or pink when wet). Corrosion explains no power, no charging, no touch and random restarts, so look for it before replacing expensive parts.$tip$,
ARRAY['Microscope or magnifier', 'Torch'], now() - interval '118 minutes'),

('hardware-tip-ip67-ip68-water-resistance', 'HARDWARE', 'Water Resistant Is Not Waterproof: IP67 and IP68 Explained', 'All brands', '', NULL, '/tips/hw-ip67-ip68-water-resistance.jpg',
$tip$Many phones are rated IP67 or IP68. This doesn't mean they are safe to swim with.

What the numbers mean:
IP67: dust tight and survives clean fresh water up to about 1 metre for about 30 minutes, in lab tests.
IP68: dust tight and survives deeper or longer, as the maker states (often 1.5 to 6 metres).

The limits:
1. Tests use still fresh water. Pools, sea water, soap and hot showers are harder on seals.
2. Seals wear with age, drops and heat.
3. A repaired phone loses its factory seal unless new seals are fitted.
4. Water damage is usually not covered by warranty, even on IP68 phones.

After a screen or battery repair, tell customers the phone is no longer water resistant unless you fitted new seals.$tip$,
ARRAY[]::text[], now() - interval '120 minutes'),

('hardware-tip-phone-in-the-rain', 'HARDWARE', 'Using Your Phone in the Rain', 'All brands', '', NULL, '/tips/hw-phone-in-the-rain.jpg',
$tip$Rain is one of the most common causes of water damage, especially for boda riders and people walking to work.

1. Carry phones in a zip lock bag or waterproof pouch during the rainy season. You can still use the touch screen through it.
2. Don't charge the phone outdoors in the rain or with a wet cable.
3. Wipe the phone dry before plugging in the charger.
4. Don't keep the phone in a pocket that gets soaked.
5. If water gets into the phone and the screen behaves strangely, switch it off at once (see our phone in water tip).

Water damaged phones often work at first and fail days later, so act early.$tip$,
ARRAY['Zip lock bag', 'Waterproof pouch'], now() - interval '122 minutes'),

('hardware-tip-sticky-liquid-damage', 'HARDWARE', 'Tea, Soda or Salt Water: Why Sticky Liquids Are Worse', 'All brands', '', NULL, '/tips/hw-sticky-liquid-damage.jpg',
$tip$Not all spills are equal. Clean fresh water is the least harmful. Others leave residue that keeps causing damage.

Tea and coffee with sugar: leave sticky deposits that trap moisture and attract dirt.
Soda and juice: sugary and acidic, so they eat into metal quickly.
Salt water and sweat: salt conducts electricity and corrodes very fast.
Milk: leaves a smelly, sticky layer.

What to do:
1. Switch off at once.
2. Tell the technician exactly what liquid it was.
3. The board needs cleaning with alcohol (and often an ultrasonic cleaner) to remove the residue, not just drying.
4. Speakers and buttons may need replacing if the liquid dried inside them.

A phone that "dried out and worked" after a sugary spill often fails later as residue corrodes.$tip$,
ARRAY['99% isopropyl alcohol', 'Soft brush'], now() - interval '124 minutes'),

('hardware-tip-water-in-speaker', 'HARDWARE', 'Water in the Speaker: Clear It Without Damage', 'All brands', '', NULL, '/tips/hw-water-in-speaker.jpg',
$tip$If sound is muffled or crackly after the phone got wet, water is probably sitting in the speaker grille.

1. Hold the phone with the speaker facing down and tap it gently on your palm.
2. Some phones have a built in "water eject" or "speaker cleaning" option. It plays a low tone that pushes water out. Use only that, not random apps that play very loud tones.
3. Leave the phone with the speaker facing down in a dry place for a few hours.
4. Don't poke anything into the grille and don't blow hard into it.
5. If sound is still bad after a day, the speaker may be damaged or the water went further inside. Bring it in for a check.

If the phone was fully submerged, follow our phone in water tip first.$tip$,
ARRAY[]::text[], now() - interval '126 minutes'),

('hardware-tip-wet-phone-dies-days-later', 'HARDWARE', 'Why a Wet Phone Can Die Days Later', 'All brands', '', NULL, '/tips/hw-wet-phone-dies-days-later.jpg',
$tip$Many people are surprised when a phone that worked fine after getting wet suddenly dies a week later.

Why it happens:
1. Water stays trapped under chips and shields even when the outside is dry.
2. With the battery connected, a small current flows through the wet areas and starts corrosion.
3. Corrosion slowly eats tiny parts and connections until something fails.
4. Minerals and sugar left by the liquid keep pulling in moisture from the air.

What it means for you:
1. Have a wet phone opened and cleaned even if it seems fine.
2. Back up your data straight away after any water accident.
3. Expect a technician to give a limited warranty on water damaged repairs.

The faster the board is cleaned, the less corrosion forms.$tip$,
ARRAY[]::text[], now() - interval '128 minutes'),

('hardware-tip-water-damaged-phone-intake', 'HARDWARE', 'Taking In a Water Damaged Phone: What to Tell the Customer', 'All brands', '', NULL, '/tips/hw-water-damaged-phone-intake.jpg',
$tip$For repair shops: clear communication avoids disputes with water damage jobs.

1. Ask what liquid it was, when it happened and what they did after (charging it, rice, hair dryer).
2. Note on the job card everything that works and doesn't work before you open it.
3. Explain that cleaning gives a chance, not a guarantee, and that new faults can appear later.
4. Give a price for diagnosis and cleaning first, then quote parts once you know what is damaged.
5. Ask if the data matters more than the phone. If yes, focus on getting it working long enough to back up.
6. Give a shorter warranty on water damaged repairs and write it on the receipt.
7. Never charge the phone to "see if it works" before opening and cleaning it.

Customers trust a shop that explains the risk honestly at the start.$tip$,
ARRAY['Job card'], now() - interval '130 minutes'),

('hardware-tip-fog-inside-camera', 'HARDWARE', 'Fog Inside the Camera After Water or Rain', 'All brands', '', NULL, '/tips/hw-fog-inside-camera.jpg',
$tip$Fog or water drops inside the camera lens mean moisture got past the seals.

1. Switch the phone off.
2. Leave it in a dry, warm (not hot) place with the camera facing down for several hours. Light fog sometimes clears.
3. Don't put it in the sun or heat it: heat can damage the camera and glue.
4. If the fog comes back or leaves marks, moisture is still inside. The phone needs opening and drying.
5. Water that reached the camera has often reached the board too, so have the board checked for corrosion.
6. If the lens has white marks after drying, replace the camera lens glass or the camera module.

A cracked camera lens glass is a common way water gets in. Replace it early.$tip$,
ARRAY['Microfibre cloth', 'Screwdriver set'], now() - interval '132 minutes'),

('hardware-tip-find-short-circuit-multimeter', 'HARDWARE', 'Find a Short Circuit with a Multimeter', 'All brands', '', NULL, '/tips/hw-find-short-circuit-multimeter.jpg',
$tip$For technicians: a short to ground on a power line is a common cause of no power and fast heating.

1. Remove the battery and any power source.
2. Set the multimeter to diode mode or low ohms.
3. Put the black probe on ground (a shield or screw hole) and the red probe on the line you're testing (for example the battery positive pin or VBUS on the charging port).
4. A reading near 0 (or a beep) means a short. Compare with a known good board if you can.
5. Use the schematic or board view to see which parts sit on that line.
6. Look for burned, cracked or corroded parts on that line first.
7. Then use heat methods (rosin, alcohol or a thermal camera with a power supply) to find which part gets warm.

Don't inject high current into a board without knowing the line's voltage: you can burn good parts.$tip$,
ARRAY['Multimeter', 'Schematic or board view', 'Microscope'], now() - interval '134 minutes'),

('hardware-tip-dead-phone-dc-power-supply', 'HARDWARE', 'Dead Phone Diagnosis with a DC Power Supply', 'All brands', '', NULL, '/tips/hw-dead-phone-dc-power-supply.jpg',
$tip$A DC power supply shows how much current a phone draws, which tells you a lot about where it is dead.

1. Set the supply to about 4.0V and limit the current to around 1A to start.
2. Connect it to the battery connector with a boot cable, observing polarity.
3. Note the current with the phone off:
   0mA and no change when pressing power: power button, power IC or open line.
   High current straight away: short on the board.
   Small current that stops at one value: the phone is stuck at a stage of startup.
4. Press power and watch how the current changes. A normal phone rises and moves up and down as it starts.
5. Compare with a known good phone of the same model if you can.

Write down the readings: they guide the next step and help when asking other technicians for advice.$tip$,
ARRAY['DC power supply', 'Battery boot cable'], now() - interval '136 minutes'),

('hardware-tip-find-shorted-part-rosin', 'HARDWARE', 'Finding a Shorted Part with Rosin or Alcohol', 'All brands', '', NULL, '/tips/hw-find-shorted-part-rosin.jpg',
$tip$Once you know a line is shorted, you need to find which part. A shorted part gets warm when power flows through it.

Rosin method:
1. Melt a little rosin with the soldering iron so smoke settles as a thin white film on the area.
2. Inject a low voltage from the power supply into the shorted line (start around 1V and limit current to 1 to 2A).
3. The film melts first over the part that heats up.

Alcohol method:
1. Brush 99% alcohol on the area.
2. Inject power as above.
3. The alcohol evaporates first over the hot part.

Then remove or replace that part and test the line again.

Never inject more than the line's normal voltage, and always remove the battery first.$tip$,
ARRAY['DC power supply', 'Rosin', 'Soldering iron', '99% isopropyl alcohol'], now() - interval '138 minutes'),

('hardware-tip-soldering-basics-phone-boards', 'HARDWARE', 'Soldering Basics for Phone Boards', 'All brands', '', NULL, '/tips/hw-soldering-basics-phone-boards.jpg',
$tip$Phone boards have tiny parts close together. Good habits matter more than expensive tools.

1. Use a temperature controlled station. 300 to 350°C suits most small parts. Too hot lifts pads.
2. Keep the tip clean and tinned. A dirty tip doesn't transfer heat.
3. Always use flux. It makes solder flow and stops bridges.
4. Touch the joint briefly. Long heat damages parts and the board.
5. Work under a microscope or good magnifier.
6. Protect nearby plastic parts and connectors with heat resistant tape.
7. Clean flux residue with isopropyl alcohol when done.
8. Disconnect the battery before any soldering.

Practise on dead boards before working on customer phones.$tip$,
ARRAY['Soldering station', 'Fine tips', 'Flux', 'Solder wire', 'Microscope'], now() - interval '140 minutes'),

('hardware-tip-choosing-flux-board-work', 'HARDWARE', 'Choosing Flux for Board Work', 'All brands', '', NULL, '/tips/hw-choosing-flux-board-work.jpg',
$tip$Flux cleans metal surfaces and helps solder flow. Using the right one makes jobs easier.

Paste flux (in a syringe): best for chips, connectors and reballing. Stays where you put it.
Liquid or pen flux: good for small joints and wires.
No clean flux: leaves little residue, but still clean it on phone boards.
Avoid plumbing flux or acid flux: it corrodes boards.

Tips:
1. Buy flux from reliable suppliers. Fake flux burns quickly and leaves black residue.
2. Use a small amount. Too much flows under parts and is hard to clean.
3. Clean residue with isopropyl alcohol and a brush when done.
4. Keep the syringe closed so it doesn't dry out.

Good flux is one of the cheapest ways to improve your soldering results.$tip$,
ARRAY['Flux paste', 'Flux pen', 'Isopropyl alcohol'], now() - interval '142 minutes'),

('hardware-tip-repair-broken-trace-jumper', 'HARDWARE', 'Repairing a Broken Trace with a Jumper Wire', 'All brands', '', NULL, '/tips/hw-repair-broken-trace-jumper.jpg',
$tip$For technicians: when a pad is torn or a track is eaten by corrosion, a jumper wire can restore the connection.

1. Find where the line goes using the schematic or board view.
2. Choose two good points on that line: the far end of the broken pad and a nearby part on the same line.
3. Scrape the solder mask gently to expose copper if needed.
4. Tin both points with a little solder and flux.
5. Cut a thin jumper wire to length and solder each end.
6. Check continuity with a multimeter from end to end, and make sure it doesn't touch ground.
7. Cover the jumper with UV solder mask and cure it to hold it in place.

Use the thinnest wire that can carry the line's current. Power lines need thicker wire than data lines.$tip$,
ARRAY['Jumper wire (0.02 to 0.1mm)', 'Microscope', 'Soldering iron', 'Flux', 'UV solder mask'], now() - interval '144 minutes'),

('hardware-tip-what-is-reballing', 'HARDWARE', 'What Reballing Is and When It''s Worth It', 'All brands', '', NULL, '/tips/hw-what-is-reballing.jpg',
$tip$Many phone chips (CPU, storage, power IC) sit on tiny balls of solder underneath (BGA). Reballing means removing a chip, cleaning it, putting new balls on and soldering it back.

When it's needed:
1. A chip has cracked joints after a drop (the phone works when you press on one area).
2. Moving a chip from a donor board.
3. Some storage or power faults after water damage.

When it's not worth it:
1. Cheap phones where a new board or phone costs less than the labour.
2. Boards with many corroded areas.

Skills and tools needed: hot air station, preheater, correct stencils for each chip, good flux and lots of practice. Phones with glued (underfilled) chips are harder.

For shops, it often makes sense to send reballing jobs to a specialist.$tip$,
ARRAY['Hot air station', 'Stencils', 'Solder paste', 'Flux', 'Preheater'], now() - interval '146 minutes'),

('hardware-tip-shorted-capacitors-no-power', 'HARDWARE', 'Shorted Capacitors: The Most Common Cause of No Power', 'All brands', '', NULL, '/tips/hw-shorted-capacitors-no-power.jpg',
$tip$For technicians: tiny capacitors filter the power lines. When one fails, it often shorts the whole line and the phone won't turn on.

1. Measure the main power lines (battery positive line, VBUS, VCC_MAIN) to ground.
2. If one is shorted, look up which capacitors are on it in the board view.
3. Inject low voltage and find the warm one (see our rosin tip).
4. Remove that capacitor with hot air or tweezers and measure again.
5. If the short is gone, most small filter capacitors can be left off temporarily for testing, then replaced with the same value.

Capacitors near the battery connector and charging port are the most likely to fail, especially after water or fake chargers.$tip$,
ARRAY['Multimeter', 'DC power supply', 'Hot air station', 'Tweezers'], now() - interval '148 minutes'),

('hardware-tip-boot-loop-hardware-causes', 'HARDWARE', 'Boot Loop That Flashing Can''t Fix: Hardware Causes', 'All brands', '', NULL, '/tips/hw-boot-loop-hardware-causes.jpg',
$tip$If a phone restarts at the logo even after a clean flash, the fault may be hardware.

Common hardware causes:
1. Stuck power or volume button (the phone keeps getting a restart signal).
2. Weak or worn battery that can't supply startup current.
3. Faulty storage chip (eMMC or UFS) with bad sectors.
4. Damaged CPU or memory joints after a drop.
5. Corrosion on a power line after water.

How to check:
1. Test the buttons first and disconnect the power button flex to see if the loop stops.
2. Try with a new battery or a DC power supply.
3. Watch the current on the power supply as it boots: a loop at the same point each time can show where it fails.
4. Check the storage chip with your flashing tool's health report if available.

Repeated flashing won't fix a hardware fault and may wear the storage more.$tip$,
ARRAY['DC power supply', 'Multimeter'], now() - interval '150 minutes')
ON CONFLICT ("id") DO NOTHING;
