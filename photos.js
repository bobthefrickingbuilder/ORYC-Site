// Central photo registry. Drop a file path into `src` for any slot; treatments and crops are applied in code.
// Fields: id, page, shot, desc, ratio, min, treat ('none'|'bw'|'duotone'), crop ('rect'|'circle'|'arch'|'half'|'bleed'), alt, src
(function () {
  const R = [];
  const S = (id, page, shot, desc, ratio, min, treat, crop, alt) =>
    R.push({ id, page, shot, desc, ratio, min, treat: treat || 'none', crop: crop || 'rect', alt: alt || desc, src: '' });

  S('HOME-HERO-01', 'Home · Hero A', 'Performance – Wide', 'Full choir on stage mid-concert, conductor in frame', '16:9', '2560×1440', 'duotone', 'bleed', 'The Ottawa Regional Youth Choir performing on stage with its conductor');
  S('HOME-HEROB-01', 'Home · Hero B', 'Performance – Close', 'Two or three choristers mid-phrase, faces lit, shallow depth of field', '4:5', '1600×2000', 'none', 'arch', 'Young choristers singing in concert');
  S('HOME-HEROB-02', 'Home · Hero B', 'Chorister Candid', 'One chorister laughing between songs, tight crop on face', '1:1', '800×800', 'none', 'circle', 'A chorister laughing at rehearsal');
  S('HOME-NEXT-01', 'Home · Next concert', 'Event Poster Image', "Concert poster for Duruflé's Requiem", '1:1', '1080×1080', 'none', 'rect', "Concert poster for Duruflé's Requiem");
  S('HOME-JOIN-01', 'Home · No auditions block', 'Chorister Candid', 'Choristers laughing or singing together at rehearsal', '3:4', '1200×1600', 'none', 'arch', 'Choristers laughing together at rehearsal');
  S('HOME-QUOTE-01', 'Home · Testimonial', 'Headshot', 'Chorister being quoted', '1:1', '800×800', 'none', 'circle', 'Portrait of the quoted chorister');
  S('HOME-LEGACY-01', 'Home · Since 1982', 'Archival / Historical', 'Early ORYC photo, 1980s–90s', '4:3', '1600×1200', 'bw', 'rect', 'The Ottawa Regional Youth Choir in its early years');
  S('HOME-MEDIA-01', 'Home · Media strip', 'Performance – Close', 'CTV Live Ottawa still (April 29, 2025)', '16:9', '1920×1080', 'none', 'rect', 'ORYC choristers performing on CTV Live Ottawa');
  S('HOME-SUPPORT-01', 'Home · Support', 'Rehearsal', 'Section rehearsal, singers with scores', '3:2', '1800×1200', 'none', 'rect', 'Choristers rehearsing with their scores');

  S('ABOUT-HERO-01', 'About · Hero', 'Group Portrait', 'Full choir posed group photo', '21:9', '2560×1100', 'none', 'bleed', 'The full Ottawa Regional Youth Choir');
  ['Jamie Loback', 'Matthew Menard', 'Aude Urbancic', 'Cara Gilbertson', 'Victor Toma'].forEach((n, i) =>
    S('ABOUT-TEAM-0' + (i + 1), 'About · Artistic team', 'Headshot', n + ', head and shoulders, plain background', '1:1', '800×800', 'none', 'circle', 'Portrait of ' + n));
  ['James Clemens', 'Elinor Clement', 'Matthew Ouellette', 'Cara Gilbertson', 'Jace Tessier'].forEach((n, i) =>
    S('ABOUT-MGMT-0' + (i + 1), 'About · Management', 'Headshot', n + ', head and shoulders, plain background', '1:1', '800×800', 'none', 'circle', 'Portrait of ' + n));
  ['James Clemens', 'Peter Beaman', 'Ashok Kumar Biswas', 'Brie van der Aa', 'Nassim Barakat', 'Ian Fine', 'Jessica McClay', 'Alex Kitt', 'Jace Tessier'].forEach((n, i) =>
    S('ABOUT-BOARD-' + String(i + 1).padStart(2, '0'), 'About · Board', 'Headshot', n + ' (optional — falls back to initials)', '1:1', '600×600', 'none', 'circle', 'Portrait of ' + n));
  S('ABOUT-CHOIR-01', 'About · Meet the Choir', 'Group Portrait', 'Full choir, sections identifiable', '16:9', '2400×1350', 'none', 'rect', 'The choir standing in its four sections');
  [['Soprano', 'Anouk Marks'], ['Alto', 'Brie van der Aa'], ['Tenor', 'Jace Tessier'], ['Bass', 'Matthew Menard']].forEach(([sec, n], i) =>
    S('ABOUT-LEAD-0' + (i + 1), 'About · Section leads', 'Headshot', n + ', ' + sec.toLowerCase() + ' section lead, head and shoulders', '1:1', '800×800', 'none', 'circle', 'Portrait of ' + n + ', ' + sec.toLowerCase() + ' section lead'));
  [['Barbara Clark', 'portrait or conducting'], ['Kevin Reeves', 'conducting'], ['Marg Stubington', 'conducting'], ['Jamie Loback', 'conducting']].forEach(([n, d], i) =>
    S('ABOUT-HIST-0' + (i + 1), 'About · Timeline', 'Archival / Historical', n + ', ' + d, '1:1', '800×800', 'bw', 'circle', n + ' conducting the choir'));
  S('ABOUT-MEMORIAM-01', 'About · In memoriam', 'Archival / Historical', 'Barbara Clark portrait', '4:5', '1200×1500', 'bw', 'rect', 'Portrait of Barbara Clark, C.M.');

  S('EVENTS-HERO-01', 'Events · Hero', 'Performance – Wide', 'Concert with audience visible', '16:9', '2560×1440', 'duotone', 'bleed', 'The choir performing to a full audience');
  ["Duruflé's Requiem", "Handel's Messiah", "Young Maestros' Showcase", "Songs for St. Joe's Supper Table", 'From Darkness to Light', 'Canadian Centennial Choir 60th Anniversary'].forEach((n, i) =>
    S('EVENT-CARD-0' + (i + 1), 'Events · Season cards', 'Event Poster Image', 'Poster image for ' + n, '1:1', '1080×1080', 'none', 'rect', 'Concert poster for ' + n));
  S('EVENT-DETAIL-HERO', 'Event detail', 'Event Poster Image', 'Concert poster', '1:1', '1080×1080', 'none', 'rect', 'Concert poster');
  S('EVENT-DETAIL-VENUE', 'Event detail', 'Venue', 'Exterior or interior of the venue', '3:2', '1800×1200', 'none', 'rect', 'The concert venue');
  const g = [['Performance – Wide', 'Full choir and orchestra from the back of the hall', '3:2'], ['Performance – Close', 'Soprano section mid-phrase', '4:5'], ['Rehearsal', 'Jamie conducting a Tuesday rehearsal', '1:1'], ['Bootcamp / Social', 'Saturday Bootcamp breakfast table', '3:2'], ['Performance – Close', 'Soloist at the front of the choir', '4:5'], ['Rehearsal', 'Sectional around the piano', '3:2'], ['Bootcamp / Social', 'Team-building game at Bootcamp', '1:1'], ['Performance – Wide', 'Candlelit concert, wide', '4:5'], ['Rehearsal', 'Choristers marking scores', '3:2'], ['Performance – Close', 'Tenors and basses singing', '3:2'], ['Bootcamp / Social', 'Group selfie after a concert', '4:5'], ['Performance – Wide', 'Bow at the end of a concert', '1:1']];
  g.forEach(([s, d, r], i) => S('GALLERY-' + String(i + 1).padStart(2, '0'), 'Events · Gallery', s, d, r, r === '3:2' ? '1800×1200' : r === '4:5' ? '1200×1500' : '1200×1200', 'none', 'rect'));

  S('SING-HERO-01', 'Sing with Us · Hero', 'Chorister Candid', 'Young singers mid-song, joyful, close range', '16:9', '2560×1440', 'none', 'bleed', 'Young singers singing joyfully');
  [['Voice placement at the piano', 'A new singer at the piano during a voice placement'], ['Meeting Jamie', 'A new singer meeting Jamie Loback'], ['First rehearsal', 'A new chorister at their first rehearsal']].forEach(([d, a], i) =>
    S('SING-STEP-0' + (i + 1), 'Sing with Us · How joining works', 'Rehearsal', d, '1:1', '800×800', 'none', 'circle', a));
  [['Rehearsal', 'Weekly Tuesday rehearsal'], ['Bootcamp / Social', 'Saturday Bootcamp breakfast'], ['Rehearsal', 'Individual voice lesson'], ['Rehearsal', 'ORYC Studio beginner session'], ['Rehearsal', 'Chorister conducting the choir']].forEach(([s, d], i) =>
    S('SING-EXPECT-0' + (i + 1), 'Sing with Us · What to expect', s, d, '3:2', '1800×1200', 'none', 'rect'));
  [1, 2, 3].forEach(i => S('SING-QUOTE-0' + i, 'Sing with Us · Testimonials', 'Headshot', 'Quoted chorister ' + i, '1:1', '800×800', 'none', 'circle', 'Portrait of the quoted chorister'));

  S('SUPPORT-HERO-01', 'Support · Hero', 'Performance – Close', 'Soloist or small group in performance', '16:9', '2560×1440', 'duotone', 'bleed', 'A small group of choristers performing');
  S('SUPPORT-FUNDS-01', 'Support · Where money goes', 'Chorister Candid', 'Inclusion Fund: choristers together, warm and candid', '4:3', '1600×1200', 'none', 'rect');
  S('SUPPORT-FUNDS-02', 'Support · Where money goes', 'Rehearsal', 'Internship: a student conducting the choir', '4:3', '1600×1200', 'none', 'rect');
  S('SUPPORT-FUNDS-03', 'Support · Where money goes', 'Performance – Wide', 'Choir with chamber orchestra', '4:3', '1600×1200', 'none', 'rect');
  S('SUPPORT-VOL-01', 'Support · Volunteer', 'Bootcamp / Social', 'Volunteers at front of house or box office', '3:2', '1800×1200', 'none', 'rect');

  S('CONTACT-VENUE-01', 'Contact', 'Venue', "St. Joseph's Parish exterior, 174 Wilbrod St.", '3:2', '1800×1200', 'none', 'rect', "St. Joseph's Parish, 174 Wilbrod Street");
  ['City of Ottawa', 'Ottawa Community Foundation', 'Choirs Ontario', 'Choral Canada'].forEach((n, i) =>
    S('FOOTER-FUNDERS-0' + (i + 1), 'Footer · Funders', 'Logo / Partner', n + ' logo, single colour or full colour on white', '3:1', 'SVG or 600×200', 'none', 'rect', n + ' logo'));

  // Real photos. Add one line per slot: 'SLOT-ID': ['path', 'alt text'].
  const SRC = {
    'HOME-LEGACY-01': ['photos/home-legacy-01.jpg', 'A stack of ORYC recordings, including the 20th and 25th anniversary CDs'],
    'HOME-SUPPORT-01': ['photos/home-support-01.jpg', 'Choristers laughing together with their scores at rehearsal'],
    'ABOUT-MEMORIAM-01': ['photos/history/barbara-clark-portrait.jpg', 'Barbara Clark, C.M., smiling over an open choral score'],
    'ABOUT-HIST-01': ['photos/history/barbara-clark.jpg', 'Barbara Clark, C.M., founder of the ORYC'],
    'ABOUT-HIST-02': ['photos/history/kevin-reeves.jpg', 'Kevin Reeves, Artistic Director 2007 to 2012'],
    'ABOUT-HIST-03': ['photos/history/marg-stubington.jpg', 'Marg Stubington, Artistic Director 2012 to 2013'],
    'ABOUT-HIST-04': ['photos/team/jamie-loback.jpg', 'Jamie Loback conducting'],
    'SING-EXPECT-02': ['photos/sing-expect-02.jpg', 'A chorister with her score and pencil during a Saturday Bootcamp session'],
    'SING-EXPECT-03': ['photos/sing-expect-03.jpg', 'A smiling vocal instructor during a lesson'],
    'ABOUT-CHOIR-01': ['photos/about-choir-01.jpg', 'The Ottawa Regional Youth Choir performing by candlelight to a full church, seen from the back of the nave'],
    'ABOUT-HERO-01': ['photos/about-hero-01.jpg', 'The Ottawa Regional Youth Choir and chamber ensemble in concert by candlelight, the conductor at the centre'],
    'EVENTS-HERO-01': ['photos/events-hero-01.jpg', 'The choir and string players in rehearsal at St. Joseph\'s Parish, with the conductor in front', 'center bottom'],
    'SING-EXPECT-05': ['photos/sing-expect-05.jpg', 'A chorister and a mentor laughing together over a score at rehearsal'],
    'SING-EXPECT-04': ['photos/sing-expect-04.jpg', 'A chorister conducting during an ORYC Studio session'],
    'SING-EXPECT-01': ['photos/sing-expect-01.jpg', 'Choristers singing from their scores as the conductor leads a Tuesday rehearsal'],
    'SING-STEP-01': ['photos/sing-step-01.jpg', 'Sheet music for El Grillo on a music stand'],
    'SING-STEP-02': ['photos/sing-step-02.jpg', 'Jamie Loback, Artistic Director, laughing at rehearsal'],
    'SING-STEP-03': ['photos/sing-step-03.jpg', 'A chorister laughing over her music folder at rehearsal'],
    'SUPPORT-HERO-01': ['photos/support-hero-01.jpg', 'The choir and chamber ensemble in concert by candlelight'],
    'SUPPORT-FUNDS-01': ['photos/support-funds-01.jpg', 'Choristers singing together on the risers behind candlelight'],
    'SUPPORT-FUNDS-02': ['photos/support-funds-02.jpg', 'A young chorister conducting the choir'],
    'SUPPORT-FUNDS-03': ['photos/support-funds-03.jpg', 'Choristers singing from their folders in concert'],
    'SUPPORT-VOL-01': ['photos/support-vol-01.jpg', 'A chorister reading through a score by the window in the music office'],
    'CONTACT-VENUE-01': ['photos/contact-venue-01.jpg', "St. Joseph's Parish on Wilbrod Street in autumn"],
    'EVENT-DETAIL-VENUE': ['photos/event-detail-venue.jpg', 'The Church of St. Barnabas, Apostle and Martyr, on James Street'],
    'GALLERY-01': ['photos/mosaic/15-dress-rehearsal.jpg', 'The choir and instrumentalists setting up for a dress rehearsal', '50% 58%'],
    'GALLERY-02': ['photos/mosaic/24-curly-score.jpg', 'Choristers singing from their scores', '48% 45%'],
    'GALLERY-03': ['photos/mosaic/10-jamie-conducting.jpg', 'Jamie Loback conducting a rehearsal', '60% 42%'],
    'GALLERY-04': ['photos/mosaic/08-break-time.jpg', 'Choristers laughing together on a rehearsal break', '55% 45%'],
    'GALLERY-05': ['photos/mosaic/30-singer-profile.jpg', 'A tenor singing in concert', '62% 38%'],
    'GALLERY-06': ['photos/mosaic/14-piano-sectional.jpg', 'A sectional gathered around the piano', '50% 55%'],
    'GALLERY-07': ['photos/mosaic/27-pointing-pews.jpg', 'A chorister laughing and pointing during a break', '36% 55%'],
    'GALLERY-08': ['photos/mosaic/33-balcony-candles.jpg', 'The candlelit concert seen from the balcony', '52% 62%'],
    'GALLERY-09': ['photos/mosaic/22-office-sectional.jpg', "A sectional rehearsing in the music office at St. Joseph's", '55% 45%'],
    'GALLERY-10': ['photos/mosaic/13-rehearsal-sing.jpg', 'Choristers singing in rehearsal as a student conducts', '50% 48%'],
    'GALLERY-11': ['photos/mosaic/23-pencil-laugh.jpg', 'A chorister laughing with a pencil tucked behind her ear', '50% 40%'],
    'GALLERY-12': ['photos/mosaic/28-organist.jpg', 'The organist playing by lamplight in concert', '62% 48%'],
    'HOME-HERO-01': ['photos/home-hero-01.jpg', 'The Ottawa Regional Youth Choir performing in concert, with the conductor and instrumentalists in front'],
    'HOME-NEXT-01': ['photos/posters/durufle.jpg', "Poster for Duruflé's Requiem, Sunday November 8, 2026, 3 pm, St. Barnabas Apostle and Martyr"],
    'EVENT-DETAIL-HERO': ['photos/posters/durufle.jpg', "Poster for Duruflé's Requiem, Sunday November 8, 2026, 3 pm, St. Barnabas Apostle and Martyr"],
    'EVENT-CARD-01': ['photos/posters/durufle.jpg', "Poster for Duruflé's Requiem"],
    'EVENT-CARD-02': ['photos/posters/messiah.jpg', "Poster for Handel's Messiah, Part I"],
    'EVENT-CARD-03': ['photos/posters/maestros.jpg', "Poster for the Young Maestros' Showcase"],
    'EVENT-CARD-04': ['photos/posters/supper-table.jpg', "Poster for Songs for St. Joe's Supper Table"],
    'EVENT-CARD-05': ['photos/posters/darkness-to-light.jpg', 'Poster for From Darkness to Light: Rachmaninoff All-Night Vigil and Gjeilo Sunrise Mass'],
    'EVENT-CARD-06': ['photos/posters/oryc-red.jpg', 'ORYC logo'],
    'HOME-JOIN-01': ['photos/home-join-01.jpg', 'A chorister holding an open score of Misa a Buenos Aires at the Kyrie'],
  };
  R.forEach(r => { const x = SRC[r.id]; if (x) { r.src = x[0]; if (x[1]) r.alt = x[1]; if (x[2]) r.pos = x[2]; } });

  // Headshots by person. Every About-page slot for that person (artistic team, management,
  // board, section leads) picks up the same photo, so someone with several roles appears consistently.
  const HEADSHOTS = {
    'Jamie Loback': 'photos/team/jamie-loback.jpg',
    'Matthew Menard': 'photos/team/matthew-menard.jpg',
    'Aude Urbancic': 'photos/team/aude-urbancic.jpg',
    'Cara Gilbertson': 'photos/team/cara-gilbertson.jpg',
    'Victor Toma': 'photos/team/victor-toma.jpg',
    'James Clemens': 'photos/team/james-clemens.jpg',
    'Elinor Clement': 'photos/team/elinor-clement.jpg',
    'Brie van der Aa': 'photos/team/brie-van-der-aa.jpg',
    'Alex Kitt': 'photos/team/alex-kitt.jpg',
    'Anouk Marks': 'photos/team/anouk-marks.jpg'
  };
  R.forEach(r => {
    if (r.src || !/^ABOUT-(TEAM|MGMT|BOARD|LEAD)-/.test(r.id)) return;
    const n = Object.keys(HEADSHOTS).find(k => r.desc.startsWith(k));
    if (n) { r.src = HEADSHOTS[n]; r.alt = n; }
  });
  // Anyone without a headshot yet gets the ORYC logo until their photo arrives.
  const PLACEHOLDER = 'photos/team/oryc-placeholder.jpg';
  R.forEach(r => {
    if (r.src || !/^ABOUT-(TEAM|MGMT|BOARD|LEAD)-/.test(r.id)) return;
    r.src = PLACEHOLDER; r.treat = 'none'; r.alt = 'ORYC logo (photo coming soon)'; r.placeholder = true;
  });
  window.ORYC_HEADSHOTS = HEADSHOTS;
  window.ORYC_HEADSHOT_PLACEHOLDER = PLACEHOLDER;

  window.ORYC_PHOTOS = Object.fromEntries(R.map(r => [r.id, r]));
  window.ORYC_PHOTO_LIST = R;
})();
