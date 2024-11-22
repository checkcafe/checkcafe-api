type CityRecord = {
  name: string;
  state: string;
  lat?: number;
  long?: number;
};

const cities: CityRecord[] = [
  {
    name: "Aceh Selatan",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Tenggara",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Timur",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Tengah",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Barat",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Besar",
    state: "Aceh (NAD)",
  },
  {
    name: "Pidie",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Utara",
    state: "Aceh (NAD)",
  },
  {
    name: "Simeulue",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Singkil",
    state: "Aceh (NAD)",
  },
  {
    name: "Bireuen",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Barat Daya",
    state: "Aceh (NAD)",
  },
  {
    name: "Gayo Lues",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Jaya",
    state: "Aceh (NAD)",
  },
  {
    name: "Nagan Raya",
    state: "Aceh (NAD)",
  },
  {
    name: "Aceh Tamiang",
    state: "Aceh (NAD)",
  },
  {
    name: "Bener Meriah",
    state: "Aceh (NAD)",
  },
  {
    name: "Pidie Jaya",
    state: "Aceh (NAD)",
  },
  {
    name: "Kota Banda Aceh",
    state: "Aceh (NAD)",
  },
  {
    name: "Kota Sabang",
    state: "Aceh (NAD)",
  },
  {
    name: "Kota Lhokseumawe",
    state: "Aceh (NAD)",
  },
  {
    name: "Kota Langsa",
    state: "Aceh (NAD)",
  },
  {
    name: "Kota Subulussalam",
    state: "Aceh (NAD)",
  },
  {
    name: "Tapanuli Tengah",
    state: "Sumatera Utara",
  },
  {
    name: "Tapanuli Utara",
    state: "Sumatera Utara",
  },
  {
    name: "Tapanuli Selatan",
    state: "Sumatera Utara",
  },
  {
    name: "Nias",
    state: "Sumatera Utara",
  },
  {
    name: "Langkat",
    state: "Sumatera Utara",
  },
  {
    name: "Karo",
    state: "Sumatera Utara",
  },
  {
    name: "Deli Serdang",
    state: "Sumatera Utara",
  },
  {
    name: "Simalungun",
    state: "Sumatera Utara",
  },
  {
    name: "Asahan",
    state: "Sumatera Utara",
  },
  {
    name: "Labuhanbatu",
    state: "Sumatera Utara",
  },
  {
    name: "Dairi",
    state: "Sumatera Utara",
  },
  {
    name: "Toba",
    state: "Sumatera Utara",
  },
  {
    name: "Mandailing Natal",
    state: "Sumatera Utara",
  },
  {
    name: "Nias Selatan",
    state: "Sumatera Utara",
  },
  {
    name: "Pakpak Bharat",
    state: "Sumatera Utara",
  },
  {
    name: "Humbang Hasundutan",
    state: "Sumatera Utara",
  },
  {
    name: "Samosir",
    state: "Sumatera Utara",
  },
  {
    name: "Serdang Bedagai",
    state: "Sumatera Utara",
  },
  {
    name: "Batu Bara",
    state: "Sumatera Utara",
  },
  {
    name: "Padang Lawas Utara",
    state: "Sumatera Utara",
  },
  {
    name: "Padang Lawas",
    state: "Sumatera Utara",
  },
  {
    name: "Labuhanbatu Selatan",
    state: "Sumatera Utara",
  },
  {
    name: "Labuhanbatu Utara",
    state: "Sumatera Utara",
  },
  {
    name: "Nias Utara",
    state: "Sumatera Utara",
  },
  {
    name: "Nias Barat",
    state: "Sumatera Utara",
  },
  {
    name: "Kota Medan",
    state: "Sumatera Utara",
    lat: 3.59,
    long: 98.678017,
  },
  {
    name: "Kota Pematangsiantar",
    state: "Sumatera Utara",
  },
  {
    name: "Kota Sibolga",
    state: "Sumatera Utara",
  },
  {
    name: "Kota Tanjung Balai",
    state: "Sumatera Utara",
  },
  {
    name: "Kota Binjai",
    state: "Sumatera Utara",
  },
  {
    name: "Kota Tebing Tinggi",
    state: "Sumatera Utara",
  },
  {
    name: "Kota Padangsidimpuan",
    state: "Sumatera Utara",
  },
  {
    name: "Kota Gunungsitoli",
    state: "Sumatera Utara",
  },
  {
    name: "Pesisir Selatan",
    state: "Sumatera Barat",
  },
  {
    name: "Solok",
    state: "Sumatera Barat",
  },
  {
    name: "Sijunjung",
    state: "Sumatera Barat",
  },
  {
    name: "Tanah Datar",
    state: "Sumatera Barat",
  },
  {
    name: "Padang Pariaman",
    state: "Sumatera Barat",
  },
  {
    name: "Agam",
    state: "Sumatera Barat",
  },
  {
    name: "Lima Puluh Kota",
    state: "Sumatera Barat",
  },
  {
    name: "Pasaman",
    state: "Sumatera Barat",
  },
  {
    name: "Kepulauan Mentawai",
    state: "Sumatera Barat",
  },
  {
    name: "Dharmasraya",
    state: "Sumatera Barat",
  },
  {
    name: "Solok Selatan",
    state: "Sumatera Barat",
  },
  {
    name: "Pasaman Barat",
    state: "Sumatera Barat",
  },
  {
    name: "Kota Padang",
    state: "Sumatera Barat",
  },
  {
    name: "Kota Solok",
    state: "Sumatera Barat",
  },
  {
    name: "Kota Sawahlunto",
    state: "Sumatera Barat",
  },
  {
    name: "Kota Padang Panjang",
    state: "Sumatera Barat",
  },
  {
    name: "Kota Bukittinggi",
    state: "Sumatera Barat",
  },
  {
    name: "Kota Payakumbuh",
    state: "Sumatera Barat",
  },
  {
    name: "Kota Pariaman",
    state: "Sumatera Barat",
  },
  {
    name: "Kampar",
    state: "Riau",
  },
  {
    name: "Indragiri Hulu",
    state: "Riau",
  },
  {
    name: "Bengkalis",
    state: "Riau",
  },
  {
    name: "Indragiri Hilir",
    state: "Riau",
  },
  {
    name: "Pelalawan",
    state: "Riau",
  },
  {
    name: "Rokan Hulu",
    state: "Riau",
  },
  {
    name: "Rokan Hilir",
    state: "Riau",
  },
  {
    name: "Siak",
    state: "Riau",
  },
  {
    name: "Kuantan Singingi",
    state: "Riau",
  },
  {
    name: "Kepulauan Meranti",
    state: "Riau",
  },
  {
    name: "Kota Pekanbaru",
    state: "Riau",
  },
  {
    name: "Kota Dumai",
    state: "Riau",
  },
  {
    name: "Kerinci",
    state: "Jambi",
  },
  {
    name: "Merangin",
    state: "Jambi",
  },
  {
    name: "Sarolangun",
    state: "Jambi",
  },
  {
    name: "Batanghari",
    state: "Jambi",
  },
  {
    name: "Muaro Jambi",
    state: "Jambi",
  },
  {
    name: "Tanjung Jabung Barat",
    state: "Jambi",
  },
  {
    name: "Tanjung Jabung Timur",
    state: "Jambi",
  },
  {
    name: "Bungo",
    state: "Jambi",
  },
  {
    name: "Tebo",
    state: "Jambi",
  },
  {
    name: "Kota Jambi",
    state: "Jambi",
  },
  {
    name: "Kota Sungai Penuh",
    state: "Jambi",
  },
  {
    name: "Ogan Komering Ulu",
    state: "Sumatera Selatan",
  },
  {
    name: "Ogan Komering Ilir",
    state: "Sumatera Selatan",
  },
  {
    name: "Muara Enim",
    state: "Sumatera Selatan",
  },
  {
    name: "Lahat",
    state: "Sumatera Selatan",
  },
  {
    name: "Musi Rawas",
    state: "Sumatera Selatan",
  },
  {
    name: "Musi Banyuasin",
    state: "Sumatera Selatan",
  },
  {
    name: "Banyuasin",
    state: "Sumatera Selatan",
  },
  {
    name: "Ogan Komering Ulu Timur",
    state: "Sumatera Selatan",
  },
  {
    name: "Ogan Komering Ulu Selatan",
    state: "Sumatera Selatan",
  },
  {
    name: "Ogan Ilir",
    state: "Sumatera Selatan",
  },
  {
    name: "Empat Lawang",
    state: "Sumatera Selatan",
  },
  {
    name: "Penukal Abab Lematang Ilir",
    state: "Sumatera Selatan",
  },
  {
    name: "Musi Rawas Utara",
    state: "Sumatera Selatan",
  },
  {
    name: "Kota Palembang",
    state: "Sumatera Selatan",
  },
  {
    name: "Kota Pagar Alam",
    state: "Sumatera Selatan",
  },
  {
    name: "Kota Lubuk Linggau",
    state: "Sumatera Selatan",
  },
  {
    name: "Kota Prabumulih",
    state: "Sumatera Selatan",
  },
  {
    name: "Bengkulu Selatan",
    state: "Bengkulu",
  },
  {
    name: "Rejang Lebong",
    state: "Bengkulu",
  },
  {
    name: "Bengkulu Utara",
    state: "Bengkulu",
  },
  {
    name: "Kaur",
    state: "Bengkulu",
  },
  {
    name: "Seluma",
    state: "Bengkulu",
  },
  {
    name: "Muko Muko",
    state: "Bengkulu",
  },
  {
    name: "Lebong",
    state: "Bengkulu",
  },
  {
    name: "Kepahiang",
    state: "Bengkulu",
  },
  {
    name: "Bengkulu Tengah",
    state: "Bengkulu",
  },
  {
    name: "Kota Bengkulu",
    state: "Bengkulu",
  },
  {
    name: "Lampung Selatan",
    state: "Lampung",
  },
  {
    name: "Lampung Tengah",
    state: "Lampung",
  },
  {
    name: "Lampung Utara",
    state: "Lampung",
  },
  {
    name: "Lampung Barat",
    state: "Lampung",
  },
  {
    name: "Tulang Bawang",
    state: "Lampung",
  },
  {
    name: "Tanggamus",
    state: "Lampung",
  },
  {
    name: "Lampung Timur",
    state: "Lampung",
  },
  {
    name: "Way Kanan",
    state: "Lampung",
  },
  {
    name: "Pesawaran",
    state: "Lampung",
  },
  {
    name: "Pringsewu",
    state: "Lampung",
  },
  {
    name: "Mesuji",
    state: "Lampung",
  },
  {
    name: "Tulang Bawang Barat",
    state: "Lampung",
  },
  {
    name: "Pesisir Barat",
    state: "Lampung",
  },
  {
    name: "Kota Bandar Lampung",
    state: "Lampung",
  },
  {
    name: "Kota Metro",
    state: "Lampung",
  },
  {
    name: "Bangka",
    state: "Kepulauan Bangka Belitung",
  },
  {
    name: "Belitung",
    state: "Kepulauan Bangka Belitung",
  },
  {
    name: "Bangka Selatan",
    state: "Kepulauan Bangka Belitung",
  },
  {
    name: "Bangka Tengah",
    state: "Kepulauan Bangka Belitung",
  },
  {
    name: "Bangka Barat",
    state: "Kepulauan Bangka Belitung",
  },
  {
    name: "Belitung Timur",
    state: "Kepulauan Bangka Belitung",
  },
  {
    name: "Kota Pangkal Pinang",
    state: "Kepulauan Bangka Belitung",
  },
  {
    name: "Bintan",
    state: "Kepulauan Riau",
  },
  {
    name: "Karimun",
    state: "Kepulauan Riau",
  },
  {
    name: "Natuna",
    state: "Kepulauan Riau",
  },
  {
    name: "Lingga",
    state: "Kepulauan Riau",
  },
  {
    name: "Kepulauan Anambas",
    state: "Kepulauan Riau",
  },
  {
    name: "Kota Batam",
    state: "Kepulauan Riau",
  },
  {
    name: "Kota Tanjung Pinang",
    state: "Kepulauan Riau",
  },
  {
    name: "Kepulauan Seribu",
    state: "DKI Jakarta",
    lat: -8.10066,
    long: 112.173241,
  },
  {
    name: "Kota Jakarta Pusat",
    state: "DKI Jakarta",
    lat: -6.34746,
    long: 107.202766,
  },
  {
    name: "Kota Jakarta Utara",
    state: "DKI Jakarta",
    lat: -6.91193,
    long: 107.651299,
  },
  {
    name: "Kota Jakarta Barat",
    state: "DKI Jakarta",
    lat: -6.23575,
    long: 107.008911,
  },
  {
    name: "Kota Jakarta Selatan",
    state: "DKI Jakarta",
    lat: -6.18836,
    long: 106.80127,
  },
  {
    name: "Kota Jakarta Timur",
    state: "DKI Jakarta",
    lat: -6.23704,
    long: 107.009644,
  },
  {
    name: "Bogor",
    state: "Jawa Barat",
    lat: -6.59712,
    long: 106.795219,
  },
  {
    name: "Sukabumi",
    state: "Jawa Barat",
  },
  {
    name: "Cianjur",
    state: "Jawa Barat",
  },
  {
    name: "Bandung",
    state: "Jawa Barat",
    lat: -6.90216,
    long: 107.61911,
  },
  {
    name: "Garut",
    state: "Jawa Barat",
  },
  {
    name: "Tasikmalaya",
    state: "Jawa Barat",
  },
  {
    name: "Ciamis",
    state: "Jawa Barat",
  },
  {
    name: "Kuningan",
    state: "Jawa Barat",
  },
  {
    name: "Cirebon",
    state: "Jawa Barat",
  },
  {
    name: "Majalengka",
    state: "Jawa Barat",
  },
  {
    name: "Sumedang",
    state: "Jawa Barat",
  },
  {
    name: "Indramayu",
    state: "Jawa Barat",
  },
  {
    name: "Subang",
    state: "Jawa Barat",
  },
  {
    name: "Purwakarta",
    state: "Jawa Barat",
  },
  {
    name: "Karawang",
    state: "Jawa Barat",
    lat: -6.2969,
    long: 107.29376,
  },
  {
    name: "Bekasi",
    state: "Jawa Barat",
    lat: -6.24331,
    long: 106.993721,
  },
  {
    name: "Bandung Barat",
    state: "Jawa Barat",
    lat: -6.90216,
    long: 107.61911,
  },
  {
    name: "Pangandaran",
    state: "Jawa Barat",
  },
  {
    name: "Kota Bogor",
    state: "Jawa Barat",
    lat: -6.59712,
    long: 106.79522,
  },
  {
    name: "Kota Sukabumi",
    state: "Jawa Barat",
  },
  {
    name: "Kota Bandung",
    state: "Jawa Barat",
    lat: -6.90216,
    long: 107.61911,
  },
  {
    name: "Kota Cirebon",
    state: "Jawa Barat",
  },
  {
    name: "Kota Bekasi",
    state: "Jawa Barat",
    lat: -6.24331,
    long: 106.99372,
  },
  {
    name: "Kota Depok",
    state: "Jawa Barat",
    lat: -6.407927,
    long: 106.815518,
  },
  {
    name: "Kota Cimahi",
    state: "Jawa Barat",
    lat: -6.87275,
    long: 107.546181,
  },
  {
    name: "Kota Tasikmalaya",
    state: "Jawa Barat",
  },
  {
    name: "Kota Banjar",
    state: "Jawa Barat",
  },
  {
    name: "Cilacap",
    state: "Jawa Tengah",
  },
  {
    name: "Banyumas",
    state: "Jawa Tengah",
  },
  {
    name: "Purbalingga",
    state: "Jawa Tengah",
  },
  {
    name: "Banjarnegara",
    state: "Jawa Tengah",
  },
  {
    name: "Kebumen",
    state: "Jawa Tengah",
  },
  {
    name: "Purworejo",
    state: "Jawa Tengah",
  },
  {
    name: "Wonosobo",
    state: "Jawa Tengah",
  },
  {
    name: "Magelang",
    state: "Jawa Tengah",
  },
  {
    name: "Boyolali",
    state: "Jawa Tengah",
  },
  {
    name: "Klaten",
    state: "Jawa Tengah",
  },
  {
    name: "Sukoharjo",
    state: "Jawa Tengah",
  },
  {
    name: "Wonogiri",
    state: "Jawa Tengah",
  },
  {
    name: "Karanganyar",
    state: "Jawa Tengah",
  },
  {
    name: "Sragen",
    state: "Jawa Tengah",
  },
  {
    name: "Grobogan",
    state: "Jawa Tengah",
  },
  {
    name: "Blora",
    state: "Jawa Tengah",
  },
  {
    name: "Rembang",
    state: "Jawa Tengah",
  },
  {
    name: "Pati",
    state: "Jawa Tengah",
  },
  {
    name: "Kudus",
    state: "Jawa Tengah",
  },
  {
    name: "Jepara",
    state: "Jawa Tengah",
  },
  {
    name: "Demak",
    state: "Jawa Tengah",
  },
  {
    name: "Semarang",
    state: "Jawa Tengah",
    lat: -7.005145,
    long: 110.438126,
  },
  {
    name: "Temanggung",
    state: "Jawa Tengah",
  },
  {
    name: "Kendal",
    state: "Jawa Tengah",
  },
  {
    name: "Batang",
    state: "Jawa Tengah",
  },
  {
    name: "Pekalongan",
    state: "Jawa Tengah",
  },
  {
    name: "Pemalang",
    state: "Jawa Tengah",
  },
  {
    name: "Tegal",
    state: "Jawa Tengah",
  },
  {
    name: "Brebes",
    state: "Jawa Tengah",
  },
  {
    name: "Kota Magelang",
    state: "Jawa Tengah",
  },
  {
    name: "Kota Surakarta",
    state: "Jawa Tengah",
  },
  {
    name: "Kota Salatiga",
    state: "Jawa Tengah",
  },
  {
    name: "Kota Semarang",
    state: "Jawa Tengah",
  },
  {
    name: "Kota Pekalongan",
    state: "Jawa Tengah",
  },
  {
    name: "Kota Tegal",
    state: "Jawa Tengah",
  },
  {
    name: "Kulon Progo",
    state: "DI Yogyakarta",
  },
  {
    name: "Bantul",
    state: "DI Yogyakarta",
  },
  {
    name: "Gunungkidul",
    state: "DI Yogyakarta",
  },
  {
    name: "Sleman",
    state: "DI Yogyakarta",
  },
  {
    name: "Kota Yogyakarta",
    state: "DI Yogyakarta",
    lat: -7.80264,
    long: 110.365051,
  },
  {
    name: "Pacitan",
    state: "Jawa Timur",
  },
  {
    name: "Ponorogo",
    state: "Jawa Timur",
  },
  {
    name: "Trenggalek",
    state: "Jawa Timur",
  },
  {
    name: "Tulungagung",
    state: "Jawa Timur",
  },
  {
    name: "Blitar",
    state: "Jawa Timur",
  },
  {
    name: "Kediri",
    state: "Jawa Timur",
  },
  {
    name: "Malang",
    state: "Jawa Timur",
  },
  {
    name: "Lumajang",
    state: "Jawa Timur",
  },
  {
    name: "Jember",
    state: "Jawa Timur",
  },
  {
    name: "Banyuwangi",
    state: "Jawa Timur",
  },
  {
    name: "Bondowoso",
    state: "Jawa Timur",
  },
  {
    name: "Situbondo",
    state: "Jawa Timur",
  },
  {
    name: "Probolinggo",
    state: "Jawa Timur",
  },
  {
    name: "Pasuruan",
    state: "Jawa Timur",
  },
  {
    name: "Sidoarjo",
    state: "Jawa Timur",
  },
  {
    name: "Mojokerto",
    state: "Jawa Timur",
  },
  {
    name: "Jombang",
    state: "Jawa Timur",
  },
  {
    name: "Nganjuk",
    state: "Jawa Timur",
  },
  {
    name: "Madiun",
    state: "Jawa Timur",
  },
  {
    name: "Magetan",
    state: "Jawa Timur",
  },
  {
    name: "Ngawi",
    state: "Jawa Timur",
  },
  {
    name: "Bojonegoro",
    state: "Jawa Timur",
  },
  {
    name: "Tuban",
    state: "Jawa Timur",
  },
  {
    name: "Lamongan",
    state: "Jawa Timur",
  },
  {
    name: "Gresik",
    state: "Jawa Timur",
  },
  {
    name: "Bangkalan",
    state: "Jawa Timur",
  },
  {
    name: "Sampang",
    state: "Jawa Timur",
  },
  {
    name: "Pamekasan",
    state: "Jawa Timur",
  },
  {
    name: "Sumenep",
    state: "Jawa Timur",
  },
  {
    name: "Kota Kediri",
    state: "Jawa Timur",
  },
  {
    name: "Kota Blitar",
    state: "Jawa Timur",
  },
  {
    name: "Kota Malang",
    state: "Jawa Timur",
  },
  {
    name: "Kota Probolinggo",
    state: "Jawa Timur",
  },
  {
    name: "Kota Pasuruan",
    state: "Jawa Timur",
  },
  {
    name: "Kota Mojokerto",
    state: "Jawa Timur",
  },
  {
    name: "Kota Madiun",
    state: "Jawa Timur",
  },
  {
    name: "Kota Surabaya",
    state: "Jawa Timur",
    lat: -7.257472,
    long: 112.75209,
  },
  {
    name: "Kota Batu",
    state: "Jawa Timur",
  },
  {
    name: "Pandeglang",
    state: "Banten",
  },
  {
    name: "Lebak",
    state: "Banten",
  },
  {
    name: "Tangerang",
    state: "Banten",
    lat: -6.17054,
    long: 106.636848,
  },
  {
    name: "Serang",
    state: "Banten",
    lat: -6.11737,
    long: 106.15303,
  },
  {
    name: "Kota Tangerang",
    state: "Banten",
    lat: -6.17054,
    long: 106.63685,
  },
  {
    name: "Kota Cilegon",
    state: "Banten",
  },
  {
    name: "Kota Serang",
    state: "Banten",
  },
  {
    name: "Kota Tangerang Selatan",
    state: "Banten",
    lat: -6.34282,
    long: 106.75267,
  },
  {
    name: "Jembrana",
    state: "Bali",
    lat: -8.35713,
    long: 114.645592,
  },
  {
    name: "Tabanan",
    state: "Bali",
  },
  {
    name: "Badung",
    state: "Bali",
    lat: -8.68462,
    long: 115.172081,
  },
  {
    name: "Gianyar",
    state: "Bali",
  },
  {
    name: "Klungkung",
    state: "Bali",
  },
  {
    name: "Bangli",
    state: "Bali",
  },
  {
    name: "Karangasem",
    state: "Bali",
  },
  {
    name: "Buleleng",
    state: "Bali",
    lat: -8.11032,
    long: 115.089394,
  },
  {
    name: "Kota Denpasar",
    state: "Bali",
    lat: -8.67218,
    long: 115.233551,
  },
  {
    name: "Lombok Barat",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Lombok Tengah",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Lombok Timur",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Sumbawa",
    state: "Nusa Tenggara Barat (NTB)",
    lat: -8.4896,
    long: 117.41993,
  },
  {
    name: "Dompu",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Bima",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Sumbawa Barat",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Lombok Utara",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Kota Mataram",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Kota Bima",
    state: "Nusa Tenggara Barat (NTB)",
  },
  {
    name: "Kupang",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Timor Tengah Selatan",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Timor Tengah Utara",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Belu",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Alor",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Flores Timur",
    state: "Nusa Tenggara Timur (NTT)",
    lat: -8.34712,
    long: 122.97692,
  },
  {
    name: "Sikka",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Ende",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Ngada",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Manggarai",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Sumba Timur",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Sumba Barat",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Lembata",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Rote Ndao",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Manggarai Barat",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Nagekeo",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Sumba Tengah",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Sumba Barat Daya",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Manggarai Timur",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Sabu Raijua",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Malaka",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Kota Kupang",
    state: "Nusa Tenggara Timur (NTT)",
  },
  {
    name: "Sambas",
    state: "Kalimantan Barat",
  },
  {
    name: "Mempawah",
    state: "Kalimantan Barat",
  },
  {
    name: "Sanggau",
    state: "Kalimantan Barat",
  },
  {
    name: "Ketapang",
    state: "Kalimantan Barat",
  },
  {
    name: "Sintang",
    state: "Kalimantan Barat",
  },
  {
    name: "Kapuas Hulu",
    state: "Kalimantan Barat",
  },
  {
    name: "Bengkayang",
    state: "Kalimantan Barat",
  },
  {
    name: "Landak",
    state: "Kalimantan Barat",
  },
  {
    name: "Sekadau",
    state: "Kalimantan Barat",
  },
  {
    name: "Melawi",
    state: "Kalimantan Barat",
  },
  {
    name: "Kayong Utara",
    state: "Kalimantan Barat",
  },
  {
    name: "Kubu Raya",
    state: "Kalimantan Barat",
  },
  {
    name: "Kota Pontianak",
    state: "Kalimantan Barat",
  },
  {
    name: "Kota Singkawang",
    state: "Kalimantan Barat",
  },
  {
    name: "Kotawaringin Barat",
    state: "Kalimantan Tengah",
  },
  {
    name: "Kotawaringin Timur",
    state: "Kalimantan Tengah",
  },
  {
    name: "Kapuas",
    state: "Kalimantan Tengah",
  },
  {
    name: "Barito Selatan",
    state: "Kalimantan Tengah",
  },
  {
    name: "Barito Utara",
    state: "Kalimantan Tengah",
  },
  {
    name: "Katingan",
    state: "Kalimantan Tengah",
  },
  {
    name: "Seruyan",
    state: "Kalimantan Tengah",
  },
  {
    name: "Sukamara",
    state: "Kalimantan Tengah",
  },
  {
    name: "Lamandau",
    state: "Kalimantan Tengah",
  },
  {
    name: "Gunung Mas",
    state: "Kalimantan Tengah",
  },
  {
    name: "Pulang Pisau",
    state: "Kalimantan Tengah",
  },
  {
    name: "Murung Raya",
    state: "Kalimantan Tengah",
  },
  {
    name: "Barito Timur",
    state: "Kalimantan Tengah",
  },
  {
    name: "Kota Palangkaraya",
    state: "Kalimantan Tengah",
  },
  {
    name: "Tanah Laut",
    state: "Kalimantan Selatan",
  },
  {
    name: "Kotabaru",
    state: "Kalimantan Selatan",
  },
  {
    name: "Banjar",
    state: "Kalimantan Selatan",
  },
  {
    name: "Barito Kuala",
    state: "Kalimantan Selatan",
  },
  {
    name: "Tapin",
    state: "Kalimantan Selatan",
  },
  {
    name: "Hulu Sungai Selatan",
    state: "Kalimantan Selatan",
  },
  {
    name: "Hulu Sungai Tengah",
    state: "Kalimantan Selatan",
  },
  {
    name: "Hulu Sungai Utara",
    state: "Kalimantan Selatan",
  },
  {
    name: "Tabalong",
    state: "Kalimantan Selatan",
  },
  {
    name: "Tanah Bumbu",
    state: "Kalimantan Selatan",
  },
  {
    name: "Balangan",
    state: "Kalimantan Selatan",
  },
  {
    name: "Kota Banjarmasin",
    state: "Kalimantan Selatan",
  },
  {
    name: "Kota Banjarbaru",
    state: "Kalimantan Selatan",
  },
  {
    name: "Paser",
    state: "Kalimantan Timur",
  },
  {
    name: "Kutai Kartanegara",
    state: "Kalimantan Timur",
  },
  {
    name: "Berau",
    state: "Kalimantan Timur",
  },
  {
    name: "Kutai Barat",
    state: "Kalimantan Timur",
  },
  {
    name: "Kutai Timur",
    state: "Kalimantan Timur",
  },
  {
    name: "Penajam Paser Utara",
    state: "Kalimantan Timur",
  },
  {
    name: "Mahakam Ulu",
    state: "Kalimantan Timur",
  },
  {
    name: "Kota Balikpapan",
    state: "Kalimantan Timur",
  },
  {
    name: "Kota Samarinda",
    state: "Kalimantan Timur",
  },
  {
    name: "Kota Bontang",
    state: "Kalimantan Timur",
  },
  {
    name: "Bulungan",
    state: "Kalimantan Utara",
  },
  {
    name: "Malinau",
    state: "Kalimantan Utara",
  },
  {
    name: "Nunukan",
    state: "Kalimantan Utara",
  },
  {
    name: "Tana Tidung",
    state: "Kalimantan Utara",
  },
  {
    name: "Kota Tarakan",
    state: "Kalimantan Utara",
  },
  {
    name: "Bolaang Mongondow",
    state: "Sulawesi Utara",
  },
  {
    name: "Minahasa",
    state: "Sulawesi Utara",
  },
  {
    name: "Kepulauan Sangihe",
    state: "Sulawesi Utara",
  },
  {
    name: "Kepulauan Talaud",
    state: "Sulawesi Utara",
  },
  {
    name: "Minahasa Selatan",
    state: "Sulawesi Utara",
  },
  {
    name: "Minahasa Utara",
    state: "Sulawesi Utara",
  },
  {
    name: "Minahasa Tenggara",
    state: "Sulawesi Utara",
  },
  {
    name: "Bolaang Mongondow Utara",
    state: "Sulawesi Utara",
  },
  {
    name: "Kepulauan Siau Tagulandang Biaro (Sitaro)",
    state: "Sulawesi Utara",
  },
  {
    name: "Bolaang Mongondow Timur",
    state: "Sulawesi Utara",
  },
  {
    name: "Bolaang Mongondow Selatan",
    state: "Sulawesi Utara",
  },
  {
    name: "Kota Manado",
    state: "Sulawesi Utara",
  },
  {
    name: "Kota Bitung",
    state: "Sulawesi Utara",
  },
  {
    name: "Kota Tomohon",
    state: "Sulawesi Utara",
  },
  {
    name: "Kota Kotamobagu",
    state: "Sulawesi Utara",
  },
  {
    name: "Banggai",
    state: "Sulawesi Tengah",
  },
  {
    name: "Poso",
    state: "Sulawesi Tengah",
  },
  {
    name: "Donggala",
    state: "Sulawesi Tengah",
  },
  {
    name: "Toli Toli",
    state: "Sulawesi Tengah",
  },
  {
    name: "Buol",
    state: "Sulawesi Tengah",
  },
  {
    name: "Morowali",
    state: "Sulawesi Tengah",
  },
  {
    name: "Banggai Kepulauan",
    state: "Sulawesi Tengah",
  },
  {
    name: "Parigi Moutong",
    state: "Sulawesi Tengah",
  },
  {
    name: "Tojo Una Una",
    state: "Sulawesi Tengah",
  },
  {
    name: "Sigi",
    state: "Sulawesi Tengah",
  },
  {
    name: "Banggai Laut",
    state: "Sulawesi Tengah",
  },
  {
    name: "Morowali Utara",
    state: "Sulawesi Tengah",
  },
  {
    name: "Kota Palu",
    state: "Sulawesi Tengah",
  },
  {
    name: "Kepulauan Selayar",
    state: "Sulawesi Selatan",
  },
  {
    name: "Bulukumba",
    state: "Sulawesi Selatan",
  },
  {
    name: "Bantaeng",
    state: "Sulawesi Selatan",
  },
  {
    name: "Jeneponto",
    state: "Sulawesi Selatan",
  },
  {
    name: "Takalar",
    state: "Sulawesi Selatan",
  },
  {
    name: "Gowa",
    state: "Sulawesi Selatan",
  },
  {
    name: "Sinjai",
    state: "Sulawesi Selatan",
  },
  {
    name: "Bone",
    state: "Sulawesi Selatan",
  },
  {
    name: "Maros",
    state: "Sulawesi Selatan",
  },
  {
    name: "Pangkajene Kepulauan",
    state: "Sulawesi Selatan",
  },
  {
    name: "Barru",
    state: "Sulawesi Selatan",
  },
  {
    name: "Soppeng",
    state: "Sulawesi Selatan",
  },
  {
    name: "Wajo",
    state: "Sulawesi Selatan",
  },
  {
    name: "Sidenreng Rappang",
    state: "Sulawesi Selatan",
  },
  {
    name: "Pinrang",
    state: "Sulawesi Selatan",
  },
  {
    name: "Enrekang",
    state: "Sulawesi Selatan",
  },
  {
    name: "Luwu",
    state: "Sulawesi Selatan",
  },
  {
    name: "Tana Toraja",
    state: "Sulawesi Selatan",
  },
  {
    name: "Luwu Utara",
    state: "Sulawesi Selatan",
  },
  {
    name: "Luwu Timur",
    state: "Sulawesi Selatan",
  },
  {
    name: "Toraja Utara",
    state: "Sulawesi Selatan",
  },
  {
    name: "Kota Makassar",
    state: "Sulawesi Selatan",
  },
  {
    name: "Kota Pare Pare",
    state: "Sulawesi Selatan",
  },
  {
    name: "Kota Palopo",
    state: "Sulawesi Selatan",
  },
  {
    name: "Kolaka",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Konawe",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Muna",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Buton",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Konawe Selatan",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Bombana",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Wakatobi",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Kolaka Utara",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Konawe Utara",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Buton Utara",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Kolaka Timur",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Konawe Kepulauan",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Muna Barat",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Buton Tengah",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Buton Selatan",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Kota Kendari",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Kota Bau Bau",
    state: "Sulawesi Tenggara",
  },
  {
    name: "Gorontalo",
    state: "Gorontalo",
  },
  {
    name: "Boalemo",
    state: "Gorontalo",
  },
  {
    name: "Bone Bolango",
    state: "Gorontalo",
  },
  {
    name: "Pahuwato",
    state: "Gorontalo",
  },
  {
    name: "Gorontalo Utara",
    state: "Gorontalo",
  },
  {
    name: "Kota Gorontalo",
    state: "Gorontalo",
  },
  {
    name: "Pasangkayu (Mamuju Utara)",
    state: "Sulawesi Barat",
  },
  {
    name: "Mamuju",
    state: "Sulawesi Barat",
  },
  {
    name: "Mamasa",
    state: "Sulawesi Barat",
  },
  {
    name: "Polewali Mandar",
    state: "Sulawesi Barat",
  },
  {
    name: "Majene",
    state: "Sulawesi Barat",
  },
  {
    name: "Mamuju Tengah",
    state: "Sulawesi Barat",
  },
  {
    name: "Maluku Tengah",
    state: "Maluku",
  },
  {
    name: "Maluku Tenggara",
    state: "Maluku",
  },
  {
    name: "Kepulauan Tanimbar (Maluku Tenggara Barat)",
    state: "Maluku",
  },
  {
    name: "Buru",
    state: "Maluku",
  },
  {
    name: "Seram Bagian Timur",
    state: "Maluku",
  },
  {
    name: "Seram Bagian Barat",
    state: "Maluku",
  },
  {
    name: "Kepulauan Aru",
    state: "Maluku",
  },
  {
    name: "Maluku Barat Daya",
    state: "Maluku",
  },
  {
    name: "Buru Selatan",
    state: "Maluku",
  },
  {
    name: "Kota Ambon",
    state: "Maluku",
  },
  {
    name: "Kota Tual",
    state: "Maluku",
  },
  {
    name: "Halmahera Barat",
    state: "Maluku Utara",
  },
  {
    name: "Halmahera Tengah",
    state: "Maluku Utara",
  },
  {
    name: "Halmahera Utara",
    state: "Maluku Utara",
  },
  {
    name: "Halmahera Selatan",
    state: "Maluku Utara",
  },
  {
    name: "Kepulauan Sula",
    state: "Maluku Utara",
  },
  {
    name: "Halmahera Timur",
    state: "Maluku Utara",
  },
  {
    name: "Pulau Morotai",
    state: "Maluku Utara",
  },
  {
    name: "Pulau Taliabu",
    state: "Maluku Utara",
  },
  {
    name: "Kota Ternate",
    state: "Maluku Utara",
  },
  {
    name: "Kota Tidore Kepulauan",
    state: "Maluku Utara",
  },
  {
    name: "Jayapura",
    state: "Papua",
  },
  {
    name: "Kepulauan Yapen",
    state: "Papua",
  },
  {
    name: "Biak Numfor",
    state: "Papua",
  },
  {
    name: "Sarmi",
    state: "Papua",
  },
  {
    name: "Keerom",
    state: "Papua",
  },
  {
    name: "Waropen",
    state: "Papua",
  },
  {
    name: "Supiori",
    state: "Papua",
  },
  {
    name: "Mamberamo Raya",
    state: "Papua",
  },
  {
    name: "Kota Jayapura",
    state: "Papua",
  },
  {
    name: "Manokwari",
    state: "Papua Barat",
  },
  {
    name: "Fak Fak",
    state: "Papua Barat",
  },
  {
    name: "Teluk Bintuni",
    state: "Papua Barat",
  },
  {
    name: "Teluk Wondama",
    state: "Papua Barat",
  },
  {
    name: "Kaimana",
    state: "Papua Barat",
  },
  {
    name: "Manokwari Selatan",
    state: "Papua Barat",
  },
  {
    name: "Pegunungan Arfak",
    state: "Papua Barat",
  },
  {
    name: "Merauke",
    state: "Papua Selatan",
  },
  {
    name: "Boven Digoel",
    state: "Papua Selatan",
  },
  {
    name: "Mappi",
    state: "Papua Selatan",
  },
  {
    name: "Asmat",
    state: "Papua Selatan",
  },
  {
    name: "Nabire",
    state: "Papua Tengah",
  },
  {
    name: "Puncak Jaya",
    state: "Papua Tengah",
  },
  {
    name: "Paniai",
    state: "Papua Tengah",
  },
  {
    name: "Mimika",
    state: "Papua Tengah",
  },
  {
    name: "Puncak",
    state: "Papua Tengah",
  },
  {
    name: "Dogiyai",
    state: "Papua Tengah",
  },
  {
    name: "Intan Jaya",
    state: "Papua Tengah",
  },
  {
    name: "Deiyai",
    state: "Papua Tengah",
  },
  {
    name: "Jayawijaya",
    state: "Papua Pegunungan",
  },
  {
    name: "Pegunungan Bintang",
    state: "Papua Pegunungan",
  },
  {
    name: "Yahukimo",
    state: "Papua Pegunungan",
  },
  {
    name: "Tolikara",
    state: "Papua Pegunungan",
  },
  {
    name: "Mamberamo Tengah",
    state: "Papua Pegunungan",
  },
  {
    name: "Yalimo",
    state: "Papua Pegunungan",
  },
  {
    name: "Lanny Jaya",
    state: "Papua Pegunungan",
  },
  {
    name: "Nduga",
    state: "Papua Pegunungan",
  },
  {
    name: "Sorong",
    state: "Papua Barat Daya",
  },
  {
    name: "Sorong Selatan",
    state: "Papua Barat Daya",
  },
  {
    name: "Raja Ampat",
    state: "Papua Barat Daya",
  },
  {
    name: "Tambrauw",
    state: "Papua Barat Daya",
  },
  {
    name: "Maybrat",
    state: "Papua Barat Daya",
  },
  {
    name: "Kota Sorong",
    state: "Papua Barat Daya",
  },
  {
    name: "Kuala Lumpur City Centre",
    state: "Kuala Lumpur",
  },
  {
    name: "Brickfields",
    state: "Kuala Lumpur",
  },
  {
    name: "Bangsar",
    state: "Kuala Lumpur",
  },
  {
    name: "Mont Kiara",
    state: "Kuala Lumpur",
  },
  {
    name: "Cheras",
    state: "Kuala Lumpur",
  },
  {
    name: "Titiwangsa",
    state: "Kuala Lumpur",
  },
  {
    name: "Setapak",
    state: "Kuala Lumpur",
  },
  {
    name: "Sentul",
    state: "Kuala Lumpur",
  },
  {
    name: "Bukit Bintang",
    state: "Kuala Lumpur",
  },
  {
    name: "Ampang",
    state: "Kuala Lumpur",
  },
  {
    name: "Wangsa Maju",
    state: "Kuala Lumpur",
  },
  {
    name: "Seputeh",
    state: "Kuala Lumpur",
  },
  {
    name: "Bukit Merah",
    state: "Central Region",
  },
  {
    name: "Bukit Timah",
    state: "Central Region",
  },
  {
    name: "Downtown Core",
    state: "Central Region",
  },
  {
    name: "Kallang",
    state: "Central Region",
  },
  {
    name: "Marina East",
    state: "Central Region",
  },
  {
    name: "Marina South",
    state: "Central Region",
  },
  {
    name: "Newton",
    state: "Central Region",
  },
  {
    name: "Orchard",
    state: "Central Region",
  },
  {
    name: "Outram",
    state: "Central Region",
  },
  {
    name: "Queenstown",
    state: "Central Region",
  },
  {
    name: "River Valley",
    state: "Central Region",
  },
  {
    name: "Rochor",
    state: "Central Region",
  },
  {
    name: "Singapore River",
    state: "Central Region",
  },
  {
    name: "Tanglin",
    state: "Central Region",
  },
  {
    name: "Toa Payoh",
    state: "Central Region",
  },

  // East Region
  {
    name: "Bedok",
    state: "East Region",
  },
  {
    name: "Changi",
    state: "East Region",
  },
  {
    name: "Changi Bay",
    state: "East Region",
  },
  {
    name: "Pasir Ris",
    state: "East Region",
  },
  {
    name: "Tampines",
    state: "East Region",
  },

  // North Region
  {
    name: "Admiralty",
    state: "North Region",
  },
  {
    name: "Mandai",
    state: "North Region",
  },
  {
    name: "Sembawang",
    state: "North Region",
  },
  {
    name: "Simpang",
    state: "North Region",
  },
  {
    name: "Woodlands",
    state: "North Region",
  },
  {
    name: "Yishun",
    state: "North Region",
  },

  // North-East Region
  {
    name: "Ang Mo Kio",
    state: "North-East Region",
  },
  {
    name: "Hougang",
    state: "North-East Region",
  },
  {
    name: "Punggol",
    state: "North-East Region",
  },
  {
    name: "Seletar",
    state: "North-East Region",
  },
  {
    name: "Sengkang",
    state: "North-East Region",
  },
  {
    name: "Serangoon",
    state: "North-East Region",
  },

  // West Region
  {
    name: "Boon Lay",
    state: "West Region",
  },
  {
    name: "Bukit Batok",
    state: "West Region",
  },
  {
    name: "Bukit Panjang",
    state: "West Region",
  },
  {
    name: "Choa Chu Kang",
    state: "West Region",
  },
  {
    name: "Clementi",
    state: "West Region",
  },
  {
    name: "Jurong East",
    state: "West Region",
  },
  {
    name: "Jurong West",
    state: "West Region",
  },
  {
    name: "Pioneer",
    state: "West Region",
  },
  {
    name: "Tengah",
    state: "West Region",
  },
  {
    name: "Tuas",
    state: "West Region",
  },
  {
    name: "Western Islands",
    state: "West Region",
  },
  {
    name: "Western Water Catchment",
    state: "West Region",
  },
];

export default cities;
