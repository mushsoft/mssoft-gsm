-- One-time content load (no schema change): 26 hardware tips on board repair, tools and running a repair shop,
-- each with its own photo from public/tips (free Pexels photos).
-- Fixed ids + ON CONFLICT DO NOTHING: added once, admin edits never overwritten.

INSERT INTO "RepairGuide" ("id", "category", "title", "brand", "modelName", "videoUrl", "thumbnail", "content", "toolsUsed", "createdAt") VALUES
('hardware-tip-phone-left-out-in-rain', 'HARDWARE', 'Phone Left Outside Overnight in the Rain', 'All brands', '', NULL, '/tips/hw-phone-left-out-in-rain.jpg',
$tip$A phone found after a night in the rain has had water in it for hours. Act carefully.

1. Don't switch it on or charge it.
2. Dry the outside, remove the SIM tray and case.
3. Take it to a technician quickly to open it, disconnect the battery and clean the board.
4. Expect corrosion: hours of water with the battery connected usually damages something.
5. If the data matters most, say so. The technician can focus on getting it working long enough to back up.

Even if it turns on, have it cleaned. Hidden corrosion usually causes failures later.$tip$,
ARRAY[]::text[], now() - interval '150 minutes'),

('hardware-tip-water-damage-and-warranty', 'HARDWARE', 'Water Damage and Warranties: What Is Covered', 'All brands', '', NULL, '/tips/hw-water-damage-and-warranty.jpg',
$tip$Most phone warranties, even for water resistant phones, don't cover liquid damage.

1. Phones have liquid indicator stickers inside that turn red or pink when wet. Service centres check these.
2. A water resistance rating (IP67 or IP68) is not a promise against water damage.
3. Some insurance or protection plans do cover accidents, including water. Check the papers.
4. For shops: write on the receipt that water damaged repairs get a limited warranty, and why.

If a phone was wet, say so honestly at the service centre. Hiding it wastes time.$tip$,
ARRAY[]::text[], now() - interval '152 minutes'),

('hardware-tip-water-damage-indicators', 'HARDWARE', 'Water Damage Indicators: Where to Find Them', 'All brands', '', NULL, '/tips/hw-water-damage-indicators.jpg',
$tip$Liquid contact indicators are small white stickers that turn red or pink when they get wet.

Where to look:
1. In the SIM tray slot on many iPhones and some Android phones. Shine a torch inside.
2. Inside the phone on the board, near the battery connector or charging port.
3. On the back of some batteries.

What they mean:
1. A red indicator means liquid reached it at some point. It can't show when or how much.
2. Humid places can sometimes trigger them too.
3. A white indicator doesn't prove the phone was never wet in other areas.

Check them at intake and note the colour on the job card.$tip$,
ARRAY['Torch', 'SIM ejector'], now() - interval '154 minutes'),

('hardware-tip-shower-steam-moisture', 'HARDWARE', 'Shower Steam and Moisture: Keep Phones Out of the Bathroom', 'All brands', '', NULL, '/tips/hw-shower-steam-moisture.jpg',
$tip$Playing music in the shower seems harmless, but steam is hard on phones.

1. Steam gets past seals more easily than splashes, especially in older phones.
2. Warm moist air condenses inside the phone as it cools.
3. Repeated exposure slowly corrodes the board, speakers and charging port.

Better:
1. Leave the phone outside the bathroom and use a Bluetooth speaker.
2. If the phone gets misty, switch it off and let it dry at room temperature.
3. Don't charge it in the bathroom.

Water resistance ratings don't cover hot water or steam.$tip$,
ARRAY[]::text[], now() - interval '156 minutes'),

('hardware-tip-identifying-small-board-parts', 'HARDWARE', 'Identifying Small Parts on a Phone Board', 'All brands', '', NULL, '/tips/hw-identifying-small-board-parts.jpg',
$tip$Knowing what you are looking at speeds up diagnosis.

1. Capacitors: small rectangles, usually tan or brown, with no markings. Filter power lines.
2. Resistors: small black rectangles, sometimes with a number code.
3. Coils (inductors): grey or black blocks, often near power ICs.
4. Diodes and filters: small parts near connectors that protect against spikes.
5. ICs: chips with many pins or balls underneath.
6. Connectors: where flex cables plug in.

The board view shows each part's name and the line it belongs to. Learn the common layout of models you repair often.$tip$,
ARRAY['Microscope', 'Board view', 'Multimeter'], now() - interval '158 minutes'),

('hardware-tip-power-ic-faults', 'HARDWARE', 'Power IC Faults: Signs and Causes', 'All brands', '', NULL, '/tips/hw-power-ic-faults.jpg',
$tip$The power management IC (PMIC) controls power to the whole phone. When it fails, the phone may not turn on at all.

Signs:
1. No power, with no short on the battery line.
2. Current on a power supply jumps and drops without booting.
3. The phone gets hot near the PMIC area.
4. Restarts or shuts down at random.

Common causes:
1. Water damage and corrosion around the chip.
2. Fake chargers and power surges.
3. Drops that crack the chip's solder joints.

Rule out the battery, buttons and shorts before suspecting the PMIC. Replacing it needs hot air skills and often reballing.$tip$,
ARRAY['DC power supply', 'Multimeter', 'Hot air station'], now() - interval '160 minutes'),

('hardware-tip-heating-whole-board-myth', 'HARDWARE', 'Why Heating the Whole Board Rarely Fixes It', 'All brands', '', NULL, '/tips/hw-heating-whole-board-myth.jpg',
$tip$Some technicians try "baking" or heating a whole board to fix a dead phone. It rarely works for long.

1. It may reflow a cracked joint for a short time, so the phone works for days or weeks, then fails again.
2. Heat damages other parts, especially memory, plastic connectors and the board itself.
3. It makes a proper repair harder later.

Better:
1. Diagnose with a power supply and multimeter.
2. Find the exact faulty area.
3. Repair or reball only that part.

A proper repair takes longer but gives the customer a phone that lasts.$tip$,
ARRAY[]::text[], now() - interval '162 minutes'),

('hardware-tip-replacing-board-connector', 'HARDWARE', 'Replacing a Damaged Board Connector', 'All brands', '', NULL, '/tips/hw-replacing-board-connector.jpg',
$tip$Screen and battery connectors on the board can be broken by careless prying or corrosion.

1. Check the replacement connector has the same pin count and shape.
2. Protect nearby parts with heat resistant tape.
3. Add flux and remove the old connector with hot air, using low airflow.
4. Clean the pads with flux and wick. Don't rub hard: pads lift easily.
5. Place the new connector, add flux and heat until it settles.
6. Check every pin under the microscope for bridges or gaps.
7. Test continuity before connecting the flex.

Plastic connectors melt easily. Keep heat short and use flux generously.$tip$,
ARRAY['Hot air station', 'Flux', 'Heat resistant tape', 'Microscope'], now() - interval '164 minutes'),

('hardware-tip-blown-coils-fuses', 'HARDWARE', 'Blown Coils and Fuses on Phone Boards', 'All brands', '', NULL, '/tips/hw-blown-coils-fuses.jpg',
$tip$Small coils and fuses protect power lines. When too much current flows, they burn open.

1. Find the line that has no power, using the schematic.
2. Measure continuity across the coil or fuse with the battery removed.
3. No continuity means it is open and needs replacing.
4. Look for the cause: a shorted part further along the line, or a bad charger. Replacing the fuse without fixing the cause makes it blow again.
5. Replace with the same value part.

Common places: charging circuits, backlight circuits on LCD phones and camera power lines.$tip$,
ARRAY['Multimeter', 'Microscope', 'Soldering iron'], now() - interval '166 minutes'),

('hardware-tip-stacked-sandwich-boards', 'HARDWARE', 'Stacked (Sandwich) Boards on Newer iPhones', 'Apple', 'iPhone X and newer', NULL, '/tips/hw-stacked-sandwich-boards.jpg',
$tip$Newer iPhones use two boards soldered on top of each other. A drop can crack the joints between them.

Signs:
1. No Wi-Fi, no signal, no sound or no camera after a drop, with no visible damage.
2. The fault comes and goes when pressing on the back.

Repair:
1. Separate the boards with a preheater or a board separator at the correct temperature.
2. Clean the joint area and reball with the right stencil.
3. Rejoin the boards with low temperature paste.
4. Test every function before closing.

This is advanced work. Many shops send stacked board repairs to specialists.$tip$,
ARRAY['Preheater', 'Board separator', 'Low temperature solder paste', 'Stencils'], now() - interval '168 minutes'),

('hardware-tip-audio-ic-faults', 'HARDWARE', 'Audio IC Faults on Phone Boards', 'All brands', '', NULL, '/tips/hw-audio-ic-faults.jpg',
$tip$If speaker, earpiece and microphone all fail together, the audio IC on the board may be faulty.

1. Test each speaker and mic with known good parts first.
2. Check if recording a video has sound.
3. Check the phone isn't stuck in headphone mode (headphone icon with nothing plugged in).
4. Look for corrosion around the audio circuit.
5. Some iPhones are known for audio IC faults after drops. The phone may also be slow to start and have greyed out voice memos.

Audio IC repair needs hot air and good board skills. Confirm the diagnosis before quoting.$tip$,
ARRAY['Multimeter', 'Hot air station', 'Microscope'], now() - interval '170 minutes'),

('hardware-tip-no-network-after-drop', 'HARDWARE', 'No Network After a Drop: Board Level Signal Faults', 'All brands', '', NULL, '/tips/hw-no-network-after-drop.jpg',
$tip$When a phone shows no service after a drop, check the simple causes before the board.

1. Test with another SIM card.
2. Check the network settings and do a network reset.
3. Check the antenna cables and contacts inside (see our antenna tip).
4. If the IMEI shows as blank or invalid in the phone's information, the radio section of the board may be damaged.
5. Radio and baseband repairs need advanced board skills.

Never try to change or rewrite an IMEI. It is illegal and only the original IMEI is valid.$tip$,
ARRAY['Another phone for comparison'], now() - interval '172 minutes'),

('hardware-tip-using-donor-boards', 'HARDWARE', 'Using Donor Boards for Parts', 'All brands', '', NULL, '/tips/hw-using-donor-boards.jpg',
$tip$Dead boards from the same model are a great source of small parts.

1. Keep dead boards by model, labelled with what is known to be faulty.
2. Small parts like connectors, coils and filters can be moved to customer boards.
3. Test donor parts if you can before fitting.
4. Never move chips that are paired to the phone's identity (such as certain security chips) to try to change it.
5. Only use boards that came from phones legally handed over to you, with the owner's permission.

A good donor collection saves time when a part is hard to buy.$tip$,
ARRAY['Hot air station', 'Microscope', 'Labelled storage'], now() - interval '174 minutes'),

('hardware-tip-cleaning-flux-residue-boards', 'HARDWARE', 'Cleaning Flux Residue From Boards', 'All brands', '', NULL, '/tips/hw-cleaning-flux-residue-boards.jpg',
$tip$Leftover flux can attract moisture and cause faults, and it makes inspection harder.

1. Let the board cool after soldering.
2. Brush the area with 99% isopropyl alcohol, working the flux loose.
3. Wipe away the dissolved flux with a lint free wipe. Don't just spread it around.
4. Repeat until no sticky residue remains.
5. Check under the microscope for flux trapped under chips and connectors.
6. Let it dry fully before powering on.

Some fluxes need a stronger flux remover. Use the cleaner recommended by the maker.$tip$,
ARRAY['99% isopropyl alcohol', 'ESD brush', 'Lint free wipes'], now() - interval '176 minutes'),

('hardware-tip-thermal-imager-short-circuits', 'HARDWARE', 'Using a Thermal Imager to Find Short Circuits', 'All brands', '', NULL, '/tips/hw-thermal-imager-short-circuits.jpg',
$tip$A thermal imager shows heat as colours, so a shorted part shows as a bright spot.

1. Find the shorted line with a multimeter first.
2. Connect the DC power supply to that line at low voltage, with the current limited.
3. Point the imager at the board. The part that heats first is usually the short.
4. Confirm by removing that part and measuring the line again.

Phone sized thermal camera add-ons are cheaper than standalone ones and good enough for most shops. Rosin or alcohol work too when you don't have one.$tip$,
ARRAY['Thermal imager', 'DC power supply'], now() - interval '178 minutes'),

('hardware-tip-burnt-parts-on-board', 'HARDWARE', 'Burnt Parts on a Board: Finding the Cause', 'All brands', '', NULL, '/tips/hw-burnt-parts-on-board.jpg',
$tip$A burnt part or mark on the board is a clue, not the whole answer.

1. Ask what happened: fake charger, power surge, water or a repair attempt.
2. Look under a microscope for all damage, not only the obvious burn.
3. Measure the line the burnt part is on for shorts.
4. Replace the part with the same value.
5. Before powering on, check what caused it. A shorted part further down the line can burn the new part too.

If the board smells burnt and many parts are damaged, the repair may cost more than the phone is worth.$tip$,
ARRAY['Microscope', 'Multimeter'], now() - interval '180 minutes'),

('hardware-tip-starter-tool-kit-repair-shop', 'HARDWARE', 'Starter Tool Kit for a New Phone Repair Shop', 'All brands', '', NULL, '/tips/hw-starter-tool-kit-repair-shop.jpg',
$tip$You don't need everything at once. Start with tools for the most common jobs: screens, batteries and charging ports.

First tools:
1. Quality precision screwdriver set.
2. Plastic opening tools, picks and suction cups.
3. ESD tweezers.
4. Heat gun or heat plate.
5. Multimeter and USB meter.
6. 99% isopropyl alcohol and brushes.
7. ESD mat and good lighting.
8. B7000 glue and adhesive strips.

Add later, as work grows:
1. Soldering station and hot air station.
2. Microscope.
3. DC power supply.
4. Screen separator.

Buy fewer tools of good quality rather than many cheap ones.$tip$,
ARRAY['Screwdriver set', 'Opening tools', 'Multimeter', 'Heat gun'], now() - interval '182 minutes'),

('hardware-tip-look-after-your-tools', 'HARDWARE', 'Look After Your Tools: Cleaning and Storage', 'All brands', '', NULL, '/tips/hw-look-after-your-tools.jpg',
$tip$Well kept tools work better and last longer.

1. Wipe screwdriver bits and tweezers at the end of the day. Glue and flux make them slip.
2. Replace worn screwdriver bits before they strip screws.
3. Clean and tin the soldering tip, then switch the station off.
4. Let the hot air station cool down properly.
5. Cover the microscope and clean its lens with a lens cloth.
6. Keep tools in an organiser so they don't get bent or lost.
7. Calibrate or check your multimeter and power supply now and then against a known reference.

Good habits save money on tools and avoid damage to customer phones.$tip$,
ARRAY['Tool organiser', 'Brass tip cleaner', 'Lens cloth'], now() - interval '184 minutes'),

('hardware-tip-heat-gun-or-hot-air', 'HARDWARE', 'Heat Gun or Hot Air Station: Which Do You Need?', 'All brands', '', NULL, '/tips/hw-heat-gun-or-hot-air.jpg',
$tip$They both blow hot air, but they are for different jobs.

Heat gun:
1. Big airflow over a wide area.
2. Good for softening screen and back glass glue.
3. Too strong and wide for small board parts.

Hot air station:
1. Small nozzle, controlled temperature and airflow.
2. Made for removing and fitting small parts and chips on boards.
3. Too small and slow for screen removal.

For a new shop, a heat gun (or heat plate) comes first for screens and batteries. Add a hot air station when you start board repairs.$tip$,
ARRAY['Heat gun', 'Hot air station'], now() - interval '186 minutes'),

('hardware-tip-ultrasonic-cleaners-safely', 'HARDWARE', 'Ultrasonic Cleaners: Use Them Safely', 'All brands', '', NULL, '/tips/hw-ultrasonic-cleaners-safely.jpg',
$tip$An ultrasonic cleaner shakes cleaning fluid with sound waves to clean under chips, which a brush can't reach.

1. Use a fluid made for electronics, not plain water.
2. Remove the battery, speakers, microphones, cameras, vibration motor and any part with a membrane. Ultrasound can damage them.
3. Clean for short cycles, a few minutes at a time.
4. Rinse with isopropyl alcohol if the fluid maker says so.
5. Dry the board completely before powering on.

Used carefully, it saves many water damaged boards. Used carelessly, it can damage parts.$tip$,
ARRAY['Ultrasonic cleaner', 'Board cleaning fluid'], now() - interval '188 minutes'),

('hardware-tip-choosing-multimeter', 'HARDWARE', 'Choosing a Multimeter for Phone Repair', 'All brands', '', NULL, '/tips/hw-choosing-multimeter.jpg',
$tip$A good multimeter makes board work quicker and more accurate.

Look for:
1. Fast continuity beep. Slow beeps make it easy to miss shorts.
2. Diode mode with a clear reading.
3. Auto ranging, or easy manual ranges.
4. A backlit display.
5. Fine, sharp probes, or buy them separately.

Tips:
1. Replace the battery when the display dims. Weak batteries give wrong readings.
2. Check the probes and leads for damage.
3. Keep a list of normal readings for boards you know.

A mid priced meter from a known brand is better than a very cheap one.$tip$,
ARRAY['Digital multimeter', 'Fine probes'], now() - interval '190 minutes'),

('hardware-tip-fume-extractor-workbench', 'HARDWARE', 'Fume Extractors for the Workbench', 'All brands', '', NULL, '/tips/hw-fume-extractor-workbench.jpg',
$tip$Flux smoke irritates eyes and lungs. Breathing it every day is not healthy.

1. Use a fume extractor with a carbon filter near the soldering work.
2. Place it close to the work, about 10 to 20cm away, so it pulls smoke before you breathe it.
3. Change filters as the maker recommends.
4. A fan blowing smoke away is better than nothing, but it spreads the smoke into the room.
5. Keep the workshop ventilated.

Your health is part of the business. Look after it.$tip$,
ARRAY['Fume extractor', 'Carbon filters'], now() - interval '192 minutes'),

('hardware-tip-clamps-and-holders', 'HARDWARE', 'Clamps and Holders: Repair Tools That Keep Work Steady', 'All brands', '', NULL, '/tips/hw-clamps-and-holders.jpg',
$tip$Steady work is safer work.

1. A board holder keeps a phone board flat and still under the microscope.
2. Screen clamps press a new screen or back glass evenly while glue sets.
3. A phone holder stand keeps the phone steady while removing screws.
4. Rubber bands work as simple clamps, but don't overtighten them on OLED screens.
5. Heat resistant holders are needed for hot air work.

Using the right holder prevents slips that scratch, crack or short a phone.$tip$,
ARRAY['Phone clamp', 'Board holder', 'Rubber bands'], now() - interval '194 minutes'),

('hardware-tip-writing-repair-warranty', 'HARDWARE', 'Writing a Clear Repair Warranty', 'All brands', '', NULL, '/tips/hw-writing-repair-warranty.jpg',
$tip$A clear warranty prevents arguments and builds trust.

Include:
1. What was repaired and which part was fitted (original, service pack, copy).
2. How long the warranty lasts (for example 30 or 90 days).
3. What it covers: the part fitted and the work done.
4. What it does not cover: new drops, water, other faults, or repairs by others.
5. Any faults found before the repair.
6. The customer's name, phone and the date.

Keep a copy. When a phone comes back, check the warranty and the job card together.$tip$,
ARRAY['Receipt book', 'Job card'], now() - interval '196 minutes'),

('hardware-tip-pricing-repairs-fairly', 'HARDWARE', 'Pricing Repairs Fairly: Parts, Time and Risk', 'All brands', '', NULL, '/tips/hw-pricing-repairs-fairly.jpg',
$tip$A fair price covers the part, your time, your tools and the risk.

1. Start with the cost of the part, including any that break during fitting.
2. Add your time. Glued and curved screens take longer.
3. Add something for risk: some repairs damage other parts, like Face ID during screen jobs.
4. Charge for diagnosis on complex faults, and deduct it if the customer goes ahead.
5. Offer options: original and copy parts at different prices.
6. Keep prices consistent and explain them clearly.

Underpricing leads to rushed work and comebacks. Customers return to shops they trust, not only the cheapest.$tip$,
ARRAY[]::text[], now() - interval '198 minutes'),

('hardware-tip-safe-diy-repairs-home', 'HARDWARE', 'DIY Repairs at Home: What Is Safe to Try', 'All brands', '', NULL, '/tips/hw-safe-diy-repairs-home.jpg',
$tip$Some simple jobs are fine to do yourself. Others are best left to a technician.

Usually safe:
1. Fitting a screen protector or case.
2. Cleaning ports, speakers and earpieces carefully.
3. Changing a removable battery on older phones.
4. Replacing a cracked camera lens glass on some phones.

Better left to a technician:
1. Glued batteries (fire risk).
2. Glued screens and curved screens.
3. Anything on the board or with soldering.
4. Water damage cleaning.

If you try a repair, buy parts from trusted sellers and watch a guide for your exact model first.$tip$,
ARRAY['Screwdriver set', 'Plastic opening tools'], now() - interval '200 minutes')
ON CONFLICT ("id") DO NOTHING;
