export type Property = {
  slug: string;
  title: string;
  location: string;
  price: string;
  status: "Aktivní" | "Rezervováno" | "Prodáno" | "Pronajato";
  type: string;
  size: string;
  disposition: string;
  image: string;
  gallery: string[];
  excerpt: string;
  description: string;
  highlights: string[];
  badge?: "Na prodej" | "K pronájmu" | "Rezervováno" | "Prodáno" | "Pronajato";
  sourceUrl?: string;
};

export const properties: Property[] = [
  {
    slug: "byt-1-1-frantiska-halase-most",
    title: "Byt 1+1 po rekonstrukci",
    location: "Františka Halase, Most",
    price: "1 980 000 Kč",
    status: "Aktivní",
    badge: "Na prodej",
    sourceUrl: "https://www.sreality.cz/detail/prodej/byt/1+1/most-most-frantiska-halase/2623057996",
    type: "Byt",
    size: "37 m²",
    disposition: "1+1",
    image: "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5Do9kXis5GSx6Ze/3361.png?fl=res,1200,1200,1|shr,,20|jpg,80",
    gallery: [
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5Do9kXis5GSx6Ze/3361.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5CDciVntKGSXkFF/777e.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/kcHp2YdDtEBMvIccZGSXmhL/e170.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5CoHumirhGSx3HX/0f6d.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5CNPfpn5zGSXhdJ/fdee.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/kcHp2YdDtEBMvIcajGSXkEl/7c9b.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5BWLrlh7qGSXhid/a240.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/kcHp2YdDtCJexHeqzGSx5i7/c28a.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/kcHp2YdDtBwNESmYVGSXi7v/a4b0.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5DwDWzn7TGSXmf2/a65f.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5CNPfpn5zGSXmbF/ebb8.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5BWZuTg2FGSx21j/8a5a.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5CoHumithGSx32u/4beb.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5CDciVntTGSXhht/a6ee.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_B/nCTUX1iX5DwDWzrI1GSx5F8/9989.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
    ],
    excerpt: "Klidný a teplý byt blízko centra Mostu s nízkými náklady, sklepní kójí a dobrou investiční perspektivou.",
    description:
      "Prodej bytu 1+1 o výměře 37 m² v klidné a vyhledávané části města Most, přesto blízko centra. Byt je v 1. nadzemním podlaží udržovaného domu, prošel rekonstrukcí a náleží k němu sklepní kóje. Díky nízkým nákladům je vhodný pro vlastní bydlení i jako investice na pronájem.",
    highlights: ["1. NP", "Sklep 1 m²", "Nízké náklady", "Osobní vlastnictví"]
  },
  {
    slug: "byt-4-1-hamerska-litvinov-janov",
    title: "Byt 4+1 s lodžií",
    location: "Hamerská, Litvínov - Janov",
    price: "769 000 Kč",
    status: "Aktivní",
    badge: "Na prodej",
    sourceUrl: "https://www.sreality.cz/detail/prodej/byt/4+1/litvinov-janov-hamerska/2385605452",
    type: "Byt",
    size: "73 m²",
    disposition: "4+1",
    image: "https://d18-a.sdn.cz/d_18/c_img_qA_D/nCTUX1iX5DwDWzBVicGbDEMc/e8e0.png?fl=res,1200,1200,1|shr,,20|jpg,80",
    gallery: [
      "https://d18-a.sdn.cz/d_18/c_img_qA_D/nCTUX1iX5DwDWzBVicGbDEMc/e8e0.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/kBfrbpoeNCgOJyF8iFrc3m8/e57a.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqBP5QmFxOFrcq6Q/6d8a.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqB6axWHJCFraehb/d641.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/kBfrbpoeNDpoIQEClFrawpJ/c0ae.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/kBfrbpoeNCsCVHEW2Frc3nQ/ca66.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqChCvUHRSFraae6/dfa0.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqECACpHoQFraVvz/428a.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqB6axWHIvFraV16/d823.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqCrBESFpSFrahst/d936.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/kBfrbpoeNCQibrTiFraywq/7c47.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqW7e6FrRFrayxJ/c057.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqBj6FAFyzFra1GK/399b.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqCrBESFpuFra8RS/276f.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqW7e6FrRFra8QU/73a1.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/kBfrbpoeNDpoIQEC4Fra58H/403b.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p8_A/nPXMbbUsvqECACpHobFra57v/d3aa.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
    ],
    excerpt: "Družstevní byt 4+1 v okrajové části sídliště Janov s lodžií, výtahem a praktickou dispozicí.",
    description:
      "Byt 4+1 s lodžií v družstevním vlastnictví se nachází ve 3. nadzemním podlaží panelového domu s výtahem. Nabízí kuchyň, obývací pokoj, tři neprůchozí pokoje, koupelnu, samostatnou toaletu a členitou předsíň s komorou. Byt je v původním, udržovaném stavu a je ihned k dispozici.",
    highlights: ["Lodžie", "Výtah", "3. NP", "Družstevní vlastnictví"]
  },
  {
    slug: "rodinny-dum-stary-rokytnik-trutnov",
    title: "Rodinný dům k rekonstrukci",
    location: "Trutnov - Starý Rokytník",
    price: "4 900 000 Kč",
    status: "Aktivní",
    badge: "Na prodej",
    sourceUrl: "https://www.sreality.cz/detail/prodej/dum/rodinny/trutnov-stary-rokytnik-/1703714892",
    type: "Dům",
    size: "109 m²",
    disposition: "3+1",
    image: "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5CoHumBIvnGenEhH/d71b.png?fl=res,1200,1200,1|shr,,20|jpg,80",
    gallery: [
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5CoHumBIvnGenEhH/d71b.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5Do9kXBHdlGenEhD/5b25.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5CoHumBIveGeoVvN/f067.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtCJexHBK0GeoWLe/3a9c.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5DwDWzBeAGGenEas/b934.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5Do9kXBHd3GenEgY/9711.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtCDcb56rGeoAjY/99ee.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5BWLrlBIOjGeoAqd/a782.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtCDcb562GeoAvT/ce80.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5bIUBBKzkGeoAwp/9a95.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5CoHumBIx2GeoApc/6bbb.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5CoHumBIx1GeoAxB/55a5.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5bIUBBKyVGeoAw8/e11c.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtCJexHBKzGeoAsm/0fd5.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5BWZuTBIORGenKhh/1d99.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5BWLrlBIM0GenMLC/0587.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtEDuRm7WGeoFE7/3ceb.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtCDcb562GeoFMv/2890.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtEDuRm6xGeoFBI/3c8f.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5bIUBBKyeGeoFIR/3bf3.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtDrxR29S0GeoFF2/ca2c.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtEBMvI7LoGeoFPp/bfd0.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5CGpNZBJDhGeoFUl/bb03.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5CFdAHBI3yGenEhW/4787.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5DwDWzBeAGGenKiD/37a9.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtDrxR29S9GeoWGn/c3ba.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/nCTUX1iX5BWLrlBITNGeoWK2/9edb.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtEDuRm6oGeoWLC/7ac2.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtEDuRm6xGeoe4d/8fde.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_E/kcHp2YdDtCDcb562Geoe5a/d790.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
    ],
    excerpt: "Dům v původním stavu s velkorysým pozemkem nabízí prostor pro rekonstrukci, zahradu i klidné bydlení.",
    description:
      "Rodinný dům v původním stavu v obci Starý Rokytník u Trutnova je vhodný pro rekonstrukci nebo investici. Dům má dispozici 3+1, užitnou plochu 109 m², sklep, půdní prostor s možností vestavby a velkorysý pozemek o výměře 1 997 m².",
    highlights: ["Pozemek 1 997 m²", "Zahrada 1 830 m²", "Sklep 6 m²", "Možnost rekonstrukce"]
  },
  {
    slug: "byt-2-kk-frantiska-malika-most",
    title: "Byt 2+kk po rekonstrukci",
    location: "Františka Malíka, Most",
    price: "10 000 Kč/měsíc",
    status: "Aktivní",
    badge: "K pronájmu",
    sourceUrl: "https://www.sreality.cz/detail/pronajem/byt/2+kk/most-most-frantiska-malika/2852602700",
    type: "Byt",
    size: "40 m²",
    disposition: "2+kk",
    image: "https://d18-a.sdn.cz/d_18/c_img_p9_E/nCTUX1iX5BWLrlQi7GNiSND/5bc8.png?fl=res,1200,1200,1|shr,,20|jpg,80",
    gallery: [
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/nCTUX1iX5BWLrlQi7GNiSND/5bc8.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/kcHp2YdDtCDcb5MdVGNiR7G/9b79.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/kcHp2YdDtzYqGNnEGNhyYe/8234.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/nCTUX1iX5bIUBQ8YGNiKdo/54b7.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/nCTUX1iX5CNPfpSzOGNiKik/a3aa.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/nCTUX1iX5CFdAHP3cGNiKko/523a.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/kcHp2YdDtzYqGNlOGNiSF6/d891.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/nCTUX1iX5bIUBQ8YGNifvk/dab0.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/nCTUX1iX5CoHumQR0GNifvo/c2d2.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/kcHp2YdDtBM3KVMohGNifqa/19ac.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/kcHp2YdDtEDuRmRJ2GNii3A/eb28.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/kcHp2YdDtCJexHObAGNiZSW/a5ca.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/nCTUX1iX5BWZuTQKyGNiivF/adde.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_p9_E/kcHp2YdDtDgLT0M46GNii2K/4411.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90",
      "https://d18-a.sdn.cz/d_18/c_img_qA_D/nCTUX1iX5CFdAHBDBoGbDI6Y/7d69.png?fl=res,1920,1080,1|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
    ],
    excerpt: "Kompletně rekonstruovaný byt 2+kk v Mostě s výtahem, připravený k nastěhování.",
    description:
      "Byt 2+kk o výměře 40 m² po kompletní rekonstrukci se nachází ve 4. poschodí panelového domu s výtahem v Mostě. Nájemné činí 10 000 Kč měsíčně, služby 2 500 Kč pro jednu osobu a byt je vhodný pro pracující osoby bez záznamu v registru dlužníků.",
    highlights: ["Po rekonstrukci", "Výtah", "K nastěhování ihned", "Služby 2 500 Kč"]
  },
  {
    slug: "prodano-byt-2-1-most-rozmarynova",
    title: "Byt 2+1, Most Rozmarýnová",
    location: "Most, Rozmarýnová",
    price: "1 450 000 Kč",
    status: "Prodáno",
    type: "Byt",
    size: "49 m²",
    disposition: "2+1",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1530.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1530.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1532.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1536.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1537.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1539.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1541.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1545.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1553.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1555.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1562.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1564.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1573.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/12/IMG_1580.jpg"
    ],
    excerpt: "Nabízíme k prodeji byt 2+1 o velikosti 49 m² v Mostě. Byt se zasklenou lodžií zaujal praktickou dispozicí, dostupností služeb a možností rekonstrukce podle vlastních představ.",
    description: "Prodaný byt 2+1 o výměře 49 m² v Mostě, v ulici Rozmarýnová. Byt v původním stavu se zasklenou lodžií nabízel prostor pro rekonstrukci podle vlastních představ a díky jasné prezentaci našel nového majitele.",
    highlights: ["Zasklená lodžie", "Dům s výtahem", "Osobní vlastnictví", "Prodáno"]
  },
  {
    slug: "prodano-mezonet-3-kk-usti-nad-labem",
    title: "Mezonetový byt 3+kk s galerií",
    location: "Ústí nad Labem, K Loděnice",
    price: "5 790 000 Kč",
    status: "Prodáno",
    type: "Byt",
    size: "140 m²",
    disposition: "3+kk",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF1257-HDR.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF1257-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/Kitchendinigroom_final.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF1221-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF1227-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/svetove_strany.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/2NP.jpg"
    ],
    excerpt: "Nabízíme byt 3+kk s otevřenou galerií v žádané lokalitě Ústí nad Labem. Prodej podpořila prezentace prostoru, světla, netradiční dispozice a příjemné atmosféry bydlení.",
    description: "Prodaný mezonetový byt 3+kk s galerií v Ústí nad Labem, lokalita K Loděnice. Prodej stál na kvalitní prezentaci dispozice, charakteru bytu a velkorysé výměry 140 m².",
    highlights: ["Mezonet", "Galerie", "Ústí nad Labem", "Prodáno"]
  },
  {
    slug: "prodano-rd-brezineves-praha-8",
    title: "Rodinný dům Březiněves",
    location: "Praha 8, Březiněves",
    price: "20 890 000 Kč",
    status: "Prodáno",
    type: "Dům",
    size: "148 m²",
    disposition: "RD",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/1xDinnigroom_final.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/1xDinnigroom_final.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/1xLivingroom_final.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/1xKidsroom-boy_final.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/1xKidsroom-gir_final.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/1NP.jpg"
    ],
    excerpt: "Ráda bych vám chtěla představit prostorný rodinný dům na prodej o dispozici 5+1, který se nachází ve velmi žádané a klidné lokalitě Praha 8 - Březiněves.",
    description: "Prodaný rodinný dům v lokalitě Březiněves, Praha 8. Nemovitost byla prezentována s důrazem na kvalitu interiéru, rodinné bydlení a výbornou dostupnost Prahy.",
    highlights: ["Praha 8", "Rodinný dům", "Kvalitní prezentace", "Prodáno"]
  },
  {
    slug: "prodano-byt-1-1-usti-severni-terasa",
    title: "Byt 1+1, Ústí nad Labem",
    location: "Ústí n. Labem, Severní Terasa",
    price: "1 599 000 Kč",
    status: "Prodáno",
    type: "Byt",
    size: "33 m²",
    disposition: "1+1",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/image0.jpeg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/image0.jpeg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/image1.1.jpeg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/image1.jpeg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/image5.jpeg"
    ],
    excerpt: "Nabízíme k prodeji byt o dispozici 1+1 a rozloze 33 m² v žádané a klidné lokalitě Severní Terasa, Ústí nad Labem. Byt zaujal dostupností a jednoduchou údržbou.",
    description: "Prodaný byt 1+1 o výměře 33 m² v Ústí nad Labem, lokalita Severní Terasa, ulice Šípková. Prodej podpořila realistická cena, čitelná prezentace a dobrá znalost lokality.",
    highlights: ["33 m²", "Severní Terasa", "Byt 1+1", "Prodáno"]
  },
  {
    slug: "prodano-rd-liba-cheb",
    title: "Rodinný dům Libá",
    location: "Libá, Cheb",
    price: "3 638 000 Kč",
    status: "Prodáno",
    type: "Dům",
    size: "Rodinný dům",
    disposition: "RD",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DJI_0889-Edit.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DJI_0889-Edit.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/1.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/2.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/3.jpg"
    ],
    excerpt: "Podsklepený rodinný dům je před rekonstrukcí, disponuje dvěma nadzemními podlažími a podkrovím. Zájemce oslovila lokalita, pozemek i možnost vytvořit si bydlení podle sebe.",
    description: "Prodaný rodinný dům v obci Libá u Chebu. Prezentace pracovala s atmosférou místa, velikostí pozemku a potenciálem domu k rekonstrukci.",
    highlights: ["Libá", "Cheb", "Rodinný dům", "Prodáno"]
  },
  {
    slug: "prodano-rd-citoliby-louny",
    title: "Rodinný dům Cítoliby",
    location: "Cítoliby, okr. Louny",
    price: "4 890 000 Kč",
    status: "Prodáno",
    type: "Dům",
    size: "Rodinný dům",
    disposition: "RD",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A0098-HDR.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A0098-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A0034-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A0018-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A0138-HDR.jpg"
    ],
    excerpt: "Dům v původním stavu je částečně podsklepený, dispozičně řešený jako dvougenerační. V přízemí domu se nachází kuchyň, obytné pokoje a navazující zázemí.",
    description: "Prodaný rodinný dům v Cítolibech, okres Louny. Ukázka prodeje mimo hlavní městské lokality s pečlivou prezentací, důrazem na dispozici a cílenou komunikací se zájemci.",
    highlights: ["Cítoliby", "Okres Louny", "Rodinný dům", "Prodáno"]
  },
  {
    slug: "prodano-byt-3-1-most-j-haska",
    title: "Byt 3+1, Most J. Haška",
    location: "Most, J. Haška",
    price: "1 499 000 Kč",
    status: "Prodáno",
    type: "Byt",
    size: "69 m²",
    disposition: "3+1",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6983.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6983.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6889.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6898.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6924.jpg"
    ],
    excerpt: "Byt o dispozici 3+1 a rozloze 69 m², jehož součástí je zasklená lodžie. Byt se nachází v 7. NP a díky prezentaci lokality rychle oslovil vhodné zájemce.",
    description: "Prodaný byt 3+1 o výměře 69 m² v Mostě, ulice J. Haška. Prodej podpořila konkrétní prezentace dispozice, výhledu, dostupnosti služeb a praktického bydlení.",
    highlights: ["69 m²", "Most", "Byt 3+1", "Prodáno"]
  },
  {
    slug: "prodano-byt-3-1-chomutov-vyletni",
    title: "Byt 3+1, Chomutov Výletní",
    location: "Chomutov, Výletní",
    price: "2 199 000 Kč",
    status: "Prodáno",
    type: "Byt",
    size: "68 m²",
    disposition: "3+1",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF9320-HDR.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF9320-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF9335-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF9305-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/DSCF9308-HDR.jpg"
    ],
    excerpt: "Byt je po kompletní rekonstrukci z letošního roku a disponuje moderní kuchyňskou linkou s vestavěnými spotřebiči. Prodej stál na kvalitních fotkách a jasném popisu stavu.",
    description: "Prodaný byt 3+1 o výměře 68 m² v Chomutově, ulice Výletní. Prodej podpořila dobrá prezentace interiéru po rekonstrukci a správně vedená komunikace se zájemci.",
    highlights: ["68 m²", "Chomutov", "Byt 3+1", "Prodáno"]
  },
  {
    slug: "prodano-byt-2-1-most-hutnicka",
    title: "Byt 2+1, Most Hutnická",
    location: "Most, Hutnická",
    price: "1 350 000 Kč",
    status: "Prodáno",
    type: "Byt",
    size: "56 m²",
    disposition: "2+1",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/dum-0801.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/kuch-0833.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/pokoj-0825.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/dum-0801.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/chodba-0865.jpg"
    ],
    excerpt: "Bytová jednotka se nachází ve 3. poschodí bez výtahu. V bytě proběhla rekonstrukce zhruba před 10 lety a prezentace ukázala praktické uspořádání i možnosti dalšího využití.",
    description: "Prodaný byt 2+1 o výměře 56 m² v Mostě, ulice Hutnická. Byt našel nového majitele díky praktické prezentaci, která srozumitelně ukázala dispozici a stav nemovitosti.",
    highlights: ["56 m²", "Most", "Byt 2+1", "Prodáno"]
  },
  {
    slug: "prodano-chalupa-valterice-u-zandova",
    title: "Chalupa Valteřice u Žandova",
    location: "Valteřice u Žandova",
    price: "4 700 000 Kč",
    status: "Prodáno",
    type: "Chalupa",
    size: "1 911 m²",
    disposition: "Chalupa",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A1467-HDR.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A1467-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A1503-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A1515-HDR.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/216A1531-HDR.jpg"
    ],
    excerpt: "Chalupa ve Valteřicích u Žandova zaujala rozlehlým pozemkem, klidnou atmosférou a možností rekreačního využití. Prodej podpořily fotky, které ukázaly charakter místa.",
    description: "Prodaná chalupa ve Valteřicích u Žandova. Prodej stál na prezentaci charakteru nemovitosti, klidné lokality a velkorysého pozemku.",
    highlights: ["Valteřice", "Chalupa", "Rekreační bydlení", "Prodáno"]
  },
  {
    slug: "prodano-komercni-objekt-bystrany-teplice",
    title: "Komerční objekt Bystřany",
    location: "Bystřany u Teplic",
    price: "4 385 000 Kč",
    status: "Prodáno",
    type: "Komerční objekt",
    size: "1 678 m²",
    disposition: "Komerce",
    image: "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6490.jpg",
    gallery: [
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6490.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6455.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6454.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6453.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6449.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6448.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6445.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6443.jpg",
      "https://marketaoktabcova.cz/wp-content/uploads/2024/10/IMG-6438.jpg"
    ],
    excerpt: "Máme tu zajímavou investiční příležitost pro investory a developery. Nemovitost se nachází v obci Bystřany u Teplic a nabízela výrazný prostor pro další využití.",
    description: "Prodaný komerční objekt v Bystřanech u Teplic. Prezentace se zaměřila na prostor, polohu, investiční potenciál a možnosti dalšího rozvoje nemovitosti.",
    highlights: ["Bystřany", "Teplice", "Komerční objekt", "Prodáno"]
  }
];

export const activeProperties = properties.filter((property) => property.status === "Aktivní" || property.status === "Rezervováno");
export const soldProperties = properties.filter((property) => property.status === "Prodáno" || property.status === "Pronajato");
