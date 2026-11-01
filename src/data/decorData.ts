export interface ToneItem {
  id: string;
  name: string;
  vietnameseTitle: string;
  subtitle: string;
  description: string;
  moodKeywords: string[];
  hexCodes: { label: string; hex: string }[];
  primaryColor: string;
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
  accentBg: string;
  flowerTypes: string[];
  suitableFor: string[];
  previewImage: string;
  highlightText: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: 'mam-trap' | 'gia-tien-tiec-cuoi' | 'thoi-noi-day-thang';
  categoryLabel: string;
  priceFrom: string;
  priceNumber: number;
  toneId: string;
  toneLabel: string;
  image: string;
  summary: string;
  features: string[];
  includes: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface TestimonialItem {
  id: string;
  coupleName: string;
  role: string;
  eventType: string;
  toneUsed: string;
  avatarText: string;
  quote: string;
  date: string;
  rating: number;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  detail: string;
  iconName: string;
}

// 5 SIGNATURE COLOR TONES
export const TONES: ToneItem[] = [
  {
    id: 'tone-red',
    name: 'Đỏ Chu Sa & Hoàng Kim',
    vietnameseTitle: 'Tone Đỏ Chu Sa Hoàng Kim',
    subtitle: 'Nét Vương Giả · Đậm Bản Sắc Cội Nguồn',
    description: 'Biểu tượng của tình duyên viên mãn, vượng khí sinh tài và son sắt thủy chung. Sự kết hợp hoàn hảo giữa sắc đỏ chu sa truyền thống cùng thếp vàng hoàng gia 24k trên nền tráp sơn mài chạm trổ rồng phượng.',
    moodKeywords: ['Truyền Thống', 'Vương Giả', 'Son Sắt', 'Phúc Lộc'],
    hexCodes: [
      { label: 'Đỏ Chu Sa', hex: '#9E1B32' },
      { label: 'Vàng Hoàng Kim', hex: '#C5A059' },
      { label: 'Đỏ Rượu Vang', hex: '#631020' },
      { label: 'Trắng Ngà', hex: '#FFF8F4' },
    ],
    primaryColor: '#9E1B32',
    badgeBg: 'bg-rose-50 text-rose-900 border-rose-200',
    badgeText: 'text-rose-900',
    cardBorder: 'border-rose-200 hover:border-rose-400',
    accentBg: 'bg-gradient-to-r from-rose-900 to-red-800',
    flowerTypes: ['Lan Hồ Điệp đỏ thắm', 'Hoa Mẫu Đơn Chu Sa', 'Hồng Ecuador nhung', 'Hoa Sen tuyết'],
    suitableFor: ['Mâm tráp Rồng Phượng cao cấp', 'Lễ Dạm Ngõ & Ăn Hỏi truyền thống', 'Lễ Gia Tiên Vu Quy - Tân Hôn', 'Tiệc cưới phong cách Cung Đình'],
    previewImage: '/images/mam_trap_red.jpg',
    highlightText: 'Được 85% gia đình lựa chọn cho nghi thức Lễ Ăn Hỏi và Rước Dâu chuẩn phong tục Việt.'
  },
  {
    id: 'tone-pink',
    name: 'Hồng Pastel & Peach Romance',
    vietnameseTitle: 'Tone Hồng Pastel & Peach Romance',
    subtitle: 'Ngọt Ngào Thanh Lịch · Giấc Mơ Cổ Tích',
    description: 'Mang sắc thái dịu êm của những cánh hoa hồng vườn sương sớm. Tone hồng pastel phối cam đào (peach) mang lại cảm giác trẻ trung, thơ mộng, tôn vinh vẻ đẹp e ấp kiều diễm của cô dâu trong ngày vu quy.',
    moodKeywords: ['Lãng Mạn', 'Ngọt Ngào', 'Kiêu Sa', 'Thanh Nhã'],
    hexCodes: [
      { label: 'Hồng Pastel', hex: '#E58B9C' },
      { label: 'Cam Đào Peach', hex: '#F7D1BA' },
      { label: 'Hồng Khói Nude', hex: '#C97A8B' },
      { label: 'Kem Sữa', hex: '#FFF9FA' },
    ],
    primaryColor: '#E58B9C',
    badgeBg: 'bg-pink-50 text-pink-900 border-pink-200',
    badgeText: 'text-pink-900',
    cardBorder: 'border-pink-200 hover:border-pink-400',
    accentBg: 'bg-gradient-to-r from-pink-600 to-rose-500',
    flowerTypes: ['Hồng O’Hara trắng hồng', 'Hoa Mao Lương (Ranunculus)', 'Cẩm Tú Cầu nhập Hà Lan', 'Hoa Baby sấy hồng phấn'],
    suitableFor: ['Trang trí Gia Tiên phong cách Hàn Quốc', 'Tiệc cưới tư gia thanh lịch', 'Backdrop chụp ảnh cưới lãng mạn', 'Thôi nôi & đầy tháng bé gái'],
    previewImage: '/images/gia_tien_pink.jpg',
    highlightText: 'Sự lựa chọn yêu thích của các cặp đôi trẻ chuộng phong cách Hàn Quốc đương đại.'
  },
  {
    id: 'tone-sage',
    name: 'Trắng Tinh Khôi & Xanh Sage',
    vietnameseTitle: 'Tone Trắng Tinh Khôi & Xanh Sage',
    subtitle: 'Thuần Khiết Tối Giản · Hơi Thở Thiên Nhiên',
    description: 'Cảm hứng từ phong cách tiệc cưới Châu Âu Rustic & Botanical. Nền trắng tinh khôi hòa quyện cùng sắc xanh lá xô thơm (sage green) và bạch đàn tạo nên không gian thanh thoát, hiện đại và tràn đầy sinh khí tự nhiên.',
    moodKeywords: ['Tinh Khiết', 'Hiện Đại', 'Tối Giản', 'Eco-Chic'],
    hexCodes: [
      { label: 'Xanh Lá Sage', hex: '#5B7563' },
      { label: 'Trắng Tinh Khôi', hex: '#FFFFFF' },
      { label: 'Xanh Olive Nhạt', hex: '#879E8C' },
      { label: 'Mộc Linen', hex: '#EBE6DF' },
    ],
    primaryColor: '#5B7563',
    badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    badgeText: 'text-emerald-900',
    cardBorder: 'border-emerald-200 hover:border-emerald-400',
    accentBg: 'bg-gradient-to-r from-emerald-800 to-teal-700',
    flowerTypes: ['Lan Hồ Điệp trắng muốt', 'Lá Bạch Đàn Dollar tròn', 'Hoa Hồng trắng Juliet', 'Lá Măng tây & Cúc Tana'],
    suitableFor: ['Tiệc cưới ngoài trời / Garden Wedding', 'Tiệc cưới Glasshouse (Nhà kính)', 'Bàn tiệc Gallery tối giản hiện đại', 'Tráp dạm ngõ hộp mica trong suốt'],
    previewImage: '/images/tiec_cuoi_sage.jpg',
    highlightText: 'Xu hướng tiệc cưới bền vững, sang trọng mà không phô trương.'
  },
  {
    id: 'tone-gold',
    name: 'Champagne & Vàng Hoàng Gia',
    vietnameseTitle: 'Tone Champagne & Vàng Hoàng Gia',
    subtitle: 'Đẳng Cấp 5 Sao · Hào Hoa Tráng Lệ',
    description: 'Tái hiện không gian dạ tiệc vương thất với sắc vàng champagne óng ả, nhung lụa cao cấp và ánh nến pha lê huyền ảo. Thể hiện sự tôn trọng tối thượng và lòng hiếu khách trọn vẹn dành cho quan viên hai họ.',
    moodKeywords: ['Xa Hoa', 'Quý Phái', 'Tráng Lệ', 'Hào Môn'],
    hexCodes: [
      { label: 'Vàng Champagne', hex: '#C89D4B' },
      { label: 'Kem Ánh Kim', hex: '#F4ECE1' },
      { label: 'Vàng Cát Gold', hex: '#A87A2E' },
      { label: 'Đen Huyền Bí', hex: '#1C1814' },
    ],
    primaryColor: '#C89D4B',
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
    badgeText: 'text-amber-900',
    cardBorder: 'border-amber-200 hover:border-amber-400',
    accentBg: 'bg-gradient-to-r from-amber-700 to-yellow-600',
    flowerTypes: ['Hoa Tulip vàng kem Pháp', 'Lan Vũ Nữ hoàng kim', 'Hoa Hồng sa mạc Cappuccino', 'Lá kim ngân phủ nhũ vàng'],
    suitableFor: ['Đại tiệc Trung tâm hội nghị tiệc cưới 5 sao', 'Sân khấu lễ đường quy mô lớn', 'Gia tiên biệt thự cổ điển sang trọng', 'Bộ mâm tráp dát vàng thủ công'],
    previewImage: '/images/hero.jpg',
    highlightText: 'Tạo dấu ấn đẳng cấp đỉnh cao cho những hôn lễ quy mô lớn.'
  },
  {
    id: 'tone-baby',
    name: 'Baby Cloud Pastel (Xanh & Hồng Mây)',
    vietnameseTitle: 'Tone Baby Pastel Ngọt Ngào',
    subtitle: 'Thiên Thần Nhỏ · Bầu Trời Tuổi Thơ Kì Diệu',
    description: 'Thiết kế riêng biệt cho Tiệc Thôi Nôi (1 tuổi) và Lễ Đầy Tháng (1 tháng tuổi). Tone xanh baby pastel bồng bềnh phối cùng hồng kem và vàng bơ ngọt ngào, tạo nên xứ sở thần tiên lưu giữ khoảnh khắc đầu đời thiêng liêng của bé yêu.',
    moodKeywords: ['Trong Veo', 'Hồn Nhiên', 'Yêu Thương', 'Xứ Sở Thần Tiên'],
    hexCodes: [
      { label: 'Xanh Baby Cloud', hex: '#6299C9' },
      { label: 'Hồng Kem Baby', hex: '#F5C6CE' },
      { label: 'Vàng Bơ Dịu', hex: '#FFF2C5' },
      { label: 'Trắng Bông Mây', hex: '#F8FAFC' },
    ],
    primaryColor: '#6299C9',
    badgeBg: 'bg-sky-50 text-sky-900 border-sky-200',
    badgeText: 'text-sky-900',
    cardBorder: 'border-sky-200 hover:border-sky-400',
    accentBg: 'bg-gradient-to-r from-sky-600 to-teal-500',
    flowerTypes: ['Hoa Baby trắng phun màu pastel', 'Cẩm chướng mini phớt hồng', 'Cúc Ping Pong tạo hình gấu', 'Bóng bay Chrome nghệ thuật'],
    suitableFor: ['Tiệc Thôi Nôi 1 tuổi cho bé trai / bé gái', 'Lễ Đầy Tháng & Cúng Mụ 12 Bà Mụ', 'Backdrop 3D khinh khí cầu & gấu bông', 'Bàn Gallery bánh kem nghệ thuật'],
    previewImage: '/images/thoi_noi_baby.jpg',
    highlightText: 'Thiết kế độc bản theo tên và tính cách của từng thiên thần nhỏ.'
  }
];

// PRODUCTS DATA
export const PRODUCTS: ProductItem[] = [
  // MÂM TRÁP
  {
    id: 'trap-01',
    title: 'Bộ 9 Tráp Rồng Phượng Sơn Mài Dát Vàng',
    category: 'mam-trap',
    categoryLabel: 'Mâm Tráp Cưới Hỏi',
    priceFrom: 'Từ 9.500.000đ',
    priceNumber: 9500000,
    toneId: 'tone-red',
    toneLabel: 'Tone Đỏ Chu Sa Hoàng Kim',
    image: '/images/mam_trap_red.jpg',
    badge: 'Được Đặt Nhiều Nhất',
    isPopular: true,
    summary: 'Tuyệt tác kết rồng quấn phượng nghệ thuật từ 100% cau trái tươi và hoa lan đỏ, khay sơn mài đỏ chu sa viền mạ vàng 24k.',
    features: [
      'Cặp Rồng Phượng sum vầy kết tay thủ công tinh xảo',
      'Buồng cau Đắk Lắk 105 trái tròn đều, tráng men giữ tươi',
      'Khay sơn mài cao cấp, vải gấm thêu chữ Hỷ kim tuyến',
      'Bánh phu thê gấc đỏ gia truyền lá dong tươi'
    ],
    includes: [
      '01 Tráp Trầu Cau Rồng Phượng cao cấp',
      '01 Tráp Rượu Vang Chile & Trà Ô Long thượng hạng',
      '01 Tráp Bánh Phu Thê truyền thống (105 cái)',
      '01 Tráp Bánh Cốm Hà Nội Bảo Minh (105 hộp)',
      '01 Tráp Trái Cây ngũ quả nhập khẩu kết hoa tươi',
      '01 Tráp Chè Thái Nguyên & Thuốc lá 3 số',
      '01 Tráp Hạt Sen Ninh Bình bọc đường phèn',
      '01 Tráp Xôi Gấc Song Hỷ hình tim đỗ xanh',
      '01 Tráp Heo Quay sữa thơm lừng da giòn rụm (3-4kg)'
    ]
  },
  {
    id: 'trap-02',
    title: 'Bộ 7 Tráp Truyền Thống Song Hỷ Lâm Môn',
    category: 'mam-trap',
    categoryLabel: 'Mâm Tráp Cưới Hỏi',
    priceFrom: 'Từ 6.800.000đ',
    priceNumber: 6800000,
    toneId: 'tone-red',
    toneLabel: 'Tone Đỏ Chu Sa Hoàng Kim',
    image: '/images/mam_trap_red.jpg',
    summary: 'Bộ lễ vật 7 tráp trang trọng chuẩn phong tục cưới hỏi truyền thống miền Bắc và miền Nam, trang trí nơ lụa và hoa tươi.',
    features: [
      'Tráp tròn sơn son thếp vàng hoặc tráp nhung đỏ cổ điển',
      'Cau tươi trầu têm cánh phượng khéo léo',
      'Hoa tươi điểm xuyết nhẹ nhàng, sang trọng',
      'Bánh phu thê, bánh cốm đóng hộp nắp kính sang trọng'
    ],
    includes: [
      '01 Tráp Trầu Cau kết tháp tròn trang trọng',
      '01 Tráp Rượu ngoại & Trà hảo hạng',
      '01 Tráp Bánh Phu Thê truyền thống',
      '01 Tráp Bánh Cốm thơm bùi',
      '01 Tráp Trái Cây kết hoa hồng tươi',
      '01 Tráp Hạt Sen trần gia bảo',
      '01 Tráp Xôi Gấc Song Hỷ dẻo thơm'
    ]
  },
  {
    id: 'trap-03',
    title: 'Bộ Tráp Dạm Ngõ & Ăn Hỏi Hiện Đại Hộp Mica',
    category: 'mam-trap',
    categoryLabel: 'Mâm Tráp Cưới Hỏi',
    priceFrom: 'Từ 4.800.000đ',
    priceNumber: 4800000,
    toneId: 'tone-sage',
    toneLabel: 'Tone Trắng Tinh Khôi & Xanh Sage',
    image: '/images/tiec_cuoi_sage.jpg',
    badge: 'Xu Hướng Mới',
    summary: 'Phong cách tối giản đương đại với hộp mica trong suốt cao cấp, phối hoa tươi ngoại nhập tone trắng sage hoặc hồng pastel.',
    features: [
      'Chất liệu hộp acrylic/mica trong suốt cao cấp dày 5mm',
      'Phối hoa tươi nhập khẩu 100% (Tulip, Lan Hồ Điệp, Bạch đàn)',
      'Dây ruy băng gấm nhập Pháp in tên cô dâu chú rể',
      'Thiết kế nhỏ gọn, tinh tế, dễ di chuyển'
    ],
    includes: [
      'Tráp Trầu Cau têm hoa trang nhã',
      'Tráp Rượu vang cao cấp & Hộp trà hoa sen',
      'Tráp Bánh hiện đại nơ lụa cao cấp',
      'Tráp Trái cây ngoại nhập (Nho mẫu đơn, Lê Hàn, Táo Envy)',
      'Bộ khay xin dâu và khay rượu lễ nhỏ đồng bộ'
    ]
  },

  // GIA TIÊN & TIỆC CƯỚI
  {
    id: 'decor-01',
    title: 'Trang Trí Gia Tiên Cao Cấp Tone Hồng Pastel Kiêu Sa',
    category: 'gia-tien-tiec-cuoi',
    categoryLabel: 'Gia Tiên & Tiệc Cưới',
    priceFrom: 'Từ 7.500.000đ',
    priceNumber: 7500000,
    toneId: 'tone-pink',
    toneLabel: 'Tone Hồng Pastel & Peach Romance',
    image: '/images/gia_tien_pink.jpg',
    badge: 'Yêu Thích Nhất',
    isPopular: true,
    summary: 'Không gian gia tiên lễ vu quy lãng mạn, ngọt ngào với phông lụa, chữ Hỷ dát vàng và hoa tươi ngoại nhập ngập tràn hương sắc.',
    features: [
      'Bàn thờ gia tiên trang nghiêm với hoành phi Song Hỷ mạ vàng 3D',
      'Bàn hai họ 12 chỗ ngồi trải khăn lụa tơ tằm mềm mại',
      'Bộ ấm chén gốm sứ hoa mẫu đơn vẽ vàng cao cấp',
      'Cổng hoa đón khách phối tone hồng pastel đồng bộ'
    ],
    includes: [
      '01 Phông nền bàn thờ Gia Tiên hoa lụa cao cấp kết hợp hoa tươi',
      '01 Bàn thờ hương án kèm bộ lư đồng, chân nến, bình hoa bàn thờ',
      '01 Bàn để mâm tráp lễ phủ lụa cao cấp',
      '02 Bàn dài hai họ + 12 ghế Chiavari đính nơ hoa lụa',
      '02 Bình hoa tươi đặt bàn hai họ',
      '02 Bộ tách chén sứ trắng cao cấp + 12 chai nước khoáng in tên CD-CR',
      '01 Cổng hoa đón khách trước cổng nhà',
      '01 Bảng Welcome thiết kế riêng kèm giá đỡ'
    ]
  },
  {
    id: 'decor-02',
    title: 'Gia Tiên Truyền Thống Phong Cách Cung Đình Chu Sa',
    category: 'gia-tien-tiec-cuoi',
    categoryLabel: 'Gia Tiên & Tiệc Cưới',
    priceFrom: 'Từ 8.500.000đ',
    priceNumber: 8500000,
    toneId: 'tone-red',
    toneLabel: 'Tone Đỏ Chu Sa Hoàng Kim',
    image: '/images/mam_trap_red.jpg',
    summary: 'Đậm chất lễ nghi cổ truyền Việt Nam với chữ Song Hỷ cách điệu, lụa đỏ chu sa, hoa sen đỏ kết hợp lan hồ điệp trang trọng.',
    features: [
      'Tông màu đỏ chu sa quyền quý, lưu giữ trọn vẹn gia phong',
      'Bộ đỉnh đồng cổ ngũ sự trang nghiêm nơi gian thờ',
      'Hoa tươi thiết kế kiểu dáng vương giả, uyển chuyển',
      'Bảng tên cô dâu chú rể khắc thư pháp nghệ thuật'
    ],
    includes: [
      'Phông nền Gia Tiên đỏ chu sa viền vàng hoàng gia',
      'Bàn thờ đầy đủ lư hương, chân đèn, mâm ngũ quả dâng gia tiên',
      'Bàn để 6-9 mâm tráp phủ nhung đỏ',
      'Bàn quan viên hai họ dài 3.6m + 12 ghế tựa cao cấp',
      '2 bình hoa sen tuyết và hoa lan đỏ rực rỡ',
      'Cổng hoa đỏ Song Hỷ nghênh đón đoàn rước dâu'
    ]
  },
  {
    id: 'decor-03',
    title: 'Trang Trí Sân Khấu Tiệc Cưới & Lễ Đường White & Sage',
    category: 'gia-tien-tiec-cuoi',
    categoryLabel: 'Gia Tiên & Tiệc Cưới',
    priceFrom: 'Từ 15.000.000đ',
    priceNumber: 15000000,
    toneId: 'tone-sage',
    toneLabel: 'Tone Trắng Tinh Khôi & Xanh Sage',
    image: '/images/tiec_cuoi_sage.jpg',
    summary: 'Không gian tiệc cưới phong cách Châu Âu hiện đại với mái vòm hoa trắng, lá bạch đàn hương thơm dịu mát và nến pha lê lấp lánh.',
    features: [
      'Backdrop sân khấu 3D uốn lượn nghệ thuật cao 3m x rộng 5m',
      'Lối đi lên lễ đường phủ hoa trắng và hàng nến trụ thủy tinh',
      'Bàn Gallery đón khách phong cách Minimalist Chic',
      'Hiệu ứng ánh sáng fairy light và đèn rọi ấm cúng'
    ],
    includes: [
      'Backdrop chụp hình check-in sảnh tiệc kích thước lớn',
      'Sân khấu chính với vòm hoa tươi & logo kim loại tên CD-CR',
      'Lối đi sân khấu dài 10m kèm 8 trụ hoa tươi đan xen nến',
      'Bàn Gallery hoa tươi, khung ảnh cưới, hộp tiền mừng',
      'Hệ thống đèn follow và đèn led chiếu sáng sân khấu'
    ]
  },
  {
    id: 'decor-04',
    title: 'Đại Tiệc Cưới Hoàng Gia Grand Champagne',
    category: 'gia-tien-tiec-cuoi',
    categoryLabel: 'Gia Tiên & Tiệc Cưới',
    priceFrom: 'Từ 25.000.000đ',
    priceNumber: 25000000,
    toneId: 'tone-gold',
    toneLabel: 'Tone Champagne & Vàng Hoàng Gia',
    image: '/images/hero.jpg',
    badge: 'Luxury 5 Sao',
    summary: 'Không gian đại tiệc xa hoa chuẩn khách sạn 5 sao với dàn đèn chùm pha lê baroque, dải lụa chiffon rủ bóng và ngập tràn hoa tulip vàng kiêu hãnh.',
    features: [
      'Hệ thống trần thả lụa và đèn chùm pha lê chuyển sắc',
      'Hoa tươi nhập khẩu 100% tuyển chọn khắt khe',
      'Sàn catwalk tráng gương phản chiếu ánh sáng lung linh',
      'Đội ngũ thi công hơn 20 nhân sự túc trực suốt tiệc'
    ],
    includes: [
      'Toàn bộ Backdrop check-in 3D cỡ đại kèm thảm hoa tươi',
      'Sân khấu lễ đường tráng gương + màn sao lấp lánh',
      'Lối dẫn cô dâu chú rể với hàng trăm ngọn nến thơm',
      'Bàn Gallery dát vàng hoàng gia + sách ký tên da thủ công',
      'Trang trí bàn tiệc VIP 2 bên sân khấu'
    ]
  },

  // THÔI NÔI & ĐẦY THÁNG
  {
    id: 'baby-01',
    title: 'Gói Thôi Nôi Khinh Khí Cầu Mây Pastel (Bé Trai / Bé Gái)',
    category: 'thoi-noi-day-thang',
    categoryLabel: 'Thôi Nôi & Đầy Tháng',
    priceFrom: 'Từ 5.500.000đ',
    priceNumber: 5500000,
    toneId: 'tone-baby',
    toneLabel: 'Tone Baby Pastel Ngọt Ngào',
    image: '/images/thoi_noi_baby.jpg',
    badge: 'Bé Yêu Thích Nhất',
    isPopular: true,
    summary: 'Backdrop 3D khinh khí cầu bồng bềnh giữa những đám mây pastel, trụ plinths bánh sinh nhật và bảng thông tin tháng tuổi của bé.',
    features: [
      'Mô hình khinh khí cầu 3D phát sáng đèn led lung linh',
      'Cung bóng bay organic phối màu pastel chuẩn phong cách Hàn Quốc',
      'Bảng tên và hình chibi của bé cắt tỉa laser sắc sảo',
      'Bảng Milestone lưu dấu những bước đi và nụ cười đầu tiên'
    ],
    includes: [
      '01 Phông nền 3D nhiều lớp tạo hình mây trời & khinh khí cầu (2.4m x 3.2m)',
      'Dây bong bóng nghệ thuật organic uốn lượn cao cấp (không mùi độc hại)',
      '03 Trụ tròn Fluted Plinths để bánh kem và hoa tươi',
      '01 Bảng thông tin 12 tháng đầu đời (Milestone Board) in sắc nét',
      '01 Khung hình chibi hoạt hình bé cao 60cm',
      'Phụ kiện trang trí: Đèn led neon sign "Happy 1st Birthday", kệ bánh cupcake'
    ]
  },
  {
    id: 'baby-02',
    title: 'Gói Thôi Nôi Công Chúa Kẹo Ngọt & Lâu Đài Hồng',
    category: 'thoi-noi-day-thang',
    categoryLabel: 'Thôi Nôi & Đầy Tháng',
    priceFrom: 'Từ 6.200.000đ',
    priceNumber: 6200000,
    toneId: 'tone-pink',
    toneLabel: 'Tone Hồng Pastel & Peach Romance',
    image: '/images/thoi_noi_baby.jpg',
    summary: 'Xứ sở cổ tích ngập tràn sắc hồng kẹo ngọt, vương miện lấp lánh và hoa bướm nghệ thuật dành tặng nàng công chúa nhỏ tròn 1 tuổi.',
    features: [
      'Mô hình lâu đài cổ tích 3D uốn cong nhẹ nhàng',
      'Dải hoa lụa và cánh bướm dập nổi sinh động',
      'Trụ gallery trưng bày album ảnh đáng yêu của bé',
      'Ánh sáng hắt chân nhẹ tạo chiều sâu ảnh chụp gia đình'
    ],
    includes: [
      'Backdrop 3D lâu đài vương miện màu hồng phấn & cam đào',
      'Cung bóng bay xoắn nghệ thuật tạo hình đám mây hồng',
      'Bảng tên bé đính đèn led phát sáng',
      'Set 4 khung hình kỉ niệm của con từ sơ sinh đến thôi nôi',
      'Kệ bánh kem và 12 bánh cupcake tạo hình theo tên bé'
    ]
  },
  {
    id: 'baby-03',
    title: 'Mâm Cúng Mụ Đầy Tháng / Thôi Nôi Chuẩn Phong Tục',
    category: 'thoi-noi-day-thang',
    categoryLabel: 'Thôi Nôi & Đầy Tháng',
    priceFrom: 'Từ 2.800.000đ',
    priceNumber: 2800000,
    toneId: 'tone-red',
    toneLabel: 'Tone Đỏ Chu Sa Hoàng Kim',
    image: '/images/mam_trap_red.jpg',
    summary: 'Mâm cúng 12 Mụ Bà & 3 Đức Ông trang trọng, chuẩn chỉ lễ nghi truyền thống để tạ ơn và cầu chúc bình an, thông tuệ cho con.',
    features: [
      'Đầy đủ lễ vật theo đúng phong tục tập quán cổ truyền',
      'Xôi gấc hoa sen thơm dẻo, chè trôi nước ngũ sắc thanh ngọt',
      'Gà ta luộc cánh tiên ngậm hoa hồng tươi',
      'Kèm văn khấn chuẩn phong tục và hướng dẫn nghi lễ bốc đồ thôi nôi'
    ],
    includes: [
      '12 phần chè nhỏ + 01 phần chè lớn (Chè đậu trắng bé trai / Chè trôi nước bé gái)',
      '12 đĩa xôi gấc Song Hỷ nhỏ + 01 đĩa xôi lớn hình hoa sen',
      '01 Con gà trống luộc cánh tiên da vàng ươm',
      '01 Bộ tam sên (Thịt heo luộc, tôm sú hấp, trứng vịt luộc)',
      '01 Mâm ngũ quả tươi ngon kết nơ lụa',
      '01 Bình hoa đồng tiền / hoa cát tường tươi tắn',
      'Nhang đèn, trầu têm cánh phượng, trà rượu gạo muối và giấy tiền cúng Mụ',
      'Bộ đồ chơi bốc nghề tương lai cho bé trong lễ thôi nôi'
    ]
  }
];

// WORKFLOW 5 STEPS
export const WORKFLOW_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Lắng Nghe & Định Hình Tone Màu',
    description: 'Chuyên viên lắng nghe câu chuyện, sở thích và cùng bạn chọn bảng tone màu chủ đạo phù hợp nhất với bản mệnh, không gian và cảm xúc mong muốn.',
    detail: 'Tư vấn trực tiếp tại Showroom hoặc qua Zalo/Video call 24/7.',
    iconName: 'Palette'
  },
  {
    number: '02',
    title: 'Khảo Sát Không Gian Thực Tế',
    description: 'Đội ngũ kỹ thuật đến tận nhà hoặc sảnh tiệc đo đạc kích thước thực tế, ánh sáng, góc chụp ảnh để đảm bảo bố cục hoàn hảo đến từng centimet.',
    detail: 'Miễn phí khảo sát nội thành trong vòng 24 giờ sau khi liên hệ.',
    iconName: 'Compass'
  },
  {
    number: '03',
    title: 'Thiết Kế 3D Phối Cảnh & Chốt Hoa Mẫu',
    description: 'Xuất bản vẽ phối cảnh 3D trực quan để bạn hình dung rõ nét không gian trước ngày diễn ra. Duyệt mẫu hoa tươi và chi tiết mâm tráp thực tế.',
    detail: 'Được chỉnh sửa không giới hạn đến khi bạn hoàn toàn hài lòng.',
    iconName: 'Layers'
  },
  {
    number: '04',
    title: 'Chuẩn Bị Thủ Công Mâm Tráp & Hoa Tươi',
    description: 'Trái cây, trầu cau và hoa tươi được nhập mới trong ngày diễn ra lễ. Nghệ nhân kết tỉ mỉ từng chi tiết rồng phượng, nơ lụa và bánh gia truyền.',
    detail: 'Cam kết 100% nguyên liệu sạch, có nguồn gốc và an toàn vệ sinh.',
    iconName: 'Sparkles'
  },
  {
    number: '05',
    title: 'Thi Công Bàn Giao Trước Giờ Hoàng Đạo',
    description: 'Đội ngũ hoàn tất thi công trước giờ lành tối thiểu 3 tiếng để gia đình an tâm chụp ảnh kỷ niệm và chuẩn bị đón tiếp khách quý trọn vẹn.',
    detail: 'Nhân viên kỹ thuật túc trực hỗ trợ trong suốt thời gian diễn ra lễ.',
    iconName: 'ClockCheck'
  }
];

// TESTIMONIALS
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    coupleName: 'Chị Lan Hương & Anh Tuấn Kiệt',
    role: 'Cô dâu & Chú rể',
    eventType: 'Tiệc Cưới Glasshouse',
    toneUsed: 'Tone Trắng Tinh Khôi & Xanh Sage',
    avatarText: 'HK',
    quote: 'Tone Trắng Sage thực sự là quyết định đúng đắn nhất của tụi mình! Khách mời ai cũng khen không gian tiệc cưới thanh thoát, lãng mạn như phim Hàn Quốc. Từng cành bạch đàn và hoa lan hồ điệp đều tươi roi rói!',
    date: 'Tháng 10, 2026',
    rating: 5
  },
  {
    id: 'test-2',
    coupleName: 'Chú rể Minh Hoàng & Cô dâu Mai Anh',
    role: 'Gia đình hai họ',
    eventType: 'Lễ Ăn Hỏi 9 Tráp & Gia Tiên',
    toneUsed: 'Tone Đỏ Chu Sa Hoàng Kim',
    avatarText: 'HA',
    quote: 'Bộ mâm tráp Rồng Phượng chạm ngọc của MÂY DECOR khiến hai họ ai cũng trầm trồ vì quá tinh xảo và uy nghiêm. Gian thờ gia tiên làm cực kỳ ấm cúng, sang trọng và chuẩn lễ nghi phong tục.',
    date: 'Tháng 09, 2026',
    rating: 5
  },
  {
    id: 'test-3',
    coupleName: 'Mẹ Bảo Trâm & Ba Đức Trí',
    role: 'Phụ huynh bé Suboi',
    eventType: 'Tiệc Thôi Nôi 1 Tuổi Bé Yêu',
    toneUsed: 'Tone Baby Pastel Cloud',
    avatarText: 'BT',
    quote: 'Backdrop khinh khí cầu 3D phát sáng và cung bóng bay pastel cưng xỉu luôn! Cả nhà có được bộ ảnh kỷ niệm 1 tuổi cho con trai đẹp hơn cả mong đợi. Các bạn làm việc rất đúng giờ và nhiệt tình.',
    date: 'Tháng 10, 2026',
    rating: 5
  }
];

// FAQS
export const FAQS = [
  {
    question: 'Nên đặt mâm tráp và dịch vụ trang trí trước ngày cưới bao lâu?',
    answer: 'Để đảm bảo việc chuẩn bị chu đáo nhất, bạn nên đặt trước từ 3 đến 6 tuần, đặc biệt vào mùa cưới cao điểm (tháng 9 đến tháng 2 âm lịch). Với tiệc gấp, MÂY DECOR vẫn có khả năng hỗ trợ trong vòng 48h - 72h tùy theo gói dịch vụ.'
  },
  {
    question: 'Hoa sử dụng trong các gói trang trí là hoa tươi hay hoa lụa cao cấp?',
    answer: 'Chúng tôi cung cấp cả hoa tươi 100% nhập khẩu (Lan Hồ Điệp, Hồng O\'Hara, Mẫu Đơn...) và hoa lụa cao cấp 95% giống hoa thật. Bạn có thể chọn gói hoa tươi toàn phần hoặc gói kết hợp thông minh để tối ưu chi phí mà vẫn giữ được sự lộng lẫy.'
  },
  {
    question: 'Tôi có thể yêu cầu phối tone màu riêng theo sở thích cá nhân không?',
    answer: 'Hoàn toàn được! Studio có đội ngũ thiết kế riêng sẽ lắng nghe câu chuyện tình yêu hoặc phong thủy bản mệnh của bạn để tùy chỉnh tone màu độc bản, từ bảng màu pantone đến hoa tươi và chất liệu khay tráp.'
  },
  {
    question: 'MÂY DECOR có hỗ trợ người bưng mâm quả (nam thanh nữ tú) không?',
    answer: 'Có! Chúng tôi có sẵn đội ngũ nam thanh nữ tú bưng mâm quả đồng đều chiều cao, gương mặt sáng sủa, trang phục áo dài truyền thống hoặc cách tân đồng bộ theo tone màu của mâm tráp.'
  }
];
