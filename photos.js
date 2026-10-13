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
  ['James Clemens', 'Matthew Ouellette', 'Elinor Clement'].forEach((n, i) =>
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
  [['Voice placement at the piano', 'A new singer at the piano during a voice placement'], ['Meeting Jamie and Cara', 'A new singer chatting with Jamie and Cara'], ['First rehearsal', 'A new chorister at their first rehearsal']].forEach(([d, a], i) =>
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
    'HOME-HERO-01': ['photos/home-hero-01.jpg', 'The Ottawa Regional Youth Choir performing in concert, with the conductor and instrumentalists in front'],
    'HOME-NEXT-01': ['photos/posters/durufle.jpg', "Poster for Duruflé's Requiem, Sunday November 8, 2026, 3 pm, St. Barnabas Apostle and Martyr"],
    'EVENT-DETAIL-HERO': ['photos/posters/durufle.jpg', "Poster for Duruflé's Requiem, Sunday November 8, 2026, 3 pm, St. Barnabas Apostle and Martyr"],
    'EVENT-CARD-01': ['photos/posters/durufle.jpg', "Poster for Duruflé's Requiem"],
    'EVENT-CARD-02': ['photos/posters/messiah.jpg', "Poster for Handel's Messiah, Part I"],
    'EVENT-CARD-03': ['photos/posters/maestros.jpg', "Poster for the Young Maestros' Showcase"],
    'EVENT-CARD-04': ['photos/posters/supper-table.jpg', "Poster for Songs for St. Joe's Supper Table"],
    'EVENT-CARD-05': ['photos/posters/darkness-to-light.jpg', 'Poster for From Darkness to Light: Rachmaninoff All-Night Vigil and Gjeilo Sunrise Mass'],
    'HOME-JOIN-01': ['photos/home-join-01.jpg', 'A chorister holding an open score of Misa a Buenos Aires at the Kyrie'],
  };
  R.forEach(r => { const x = SRC[r.id]; if (x) { r.src = x[0]; if (x[1]) r.alt = x[1]; } });

  window.ORYC_PHOTOS = Object.fromEntries(R.map(r => [r.id, r]));
  window.ORYC_PHOTO_LIST = R;
})();
