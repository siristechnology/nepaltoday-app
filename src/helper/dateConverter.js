function getNepaliMonthsInNepali() {
	return ['बैशाख', 'जेठ', 'अषाढ', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मङ्सिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र']
}
function getNepaliMonth(t) {
	t = parseInt(t, 10)
	var e = getNepaliMonthsInNepali()
	return e[t]
}
function getCurrentDayName() {
	var t = new Date(),
		e = t.getDay(),
		n = Array(7)
	return (
		(n[0] = 'Sunday'),
		(n[1] = 'Monday'),
		(n[2] = 'Tuesday'),
		(n[3] = 'Wednesday'),
		(n[4] = 'Thursday'),
		(n[5] = 'Friday'),
		(n[6] = 'Saturday'),
		n[e]
	)
}
function AD2BS(t) {
	var e = new NepaliDateConverter()
	return e.ad2bs(getNepaliFormat(t))
}
function BS2AD(t) {
	var e = new NepaliDateConverter()
	return e.bs2ad(getNepaliFormat(t))
}
function getDateInNo(t) {
	var e = new Date(),
		n = e.getDate(),
		a = e.getMonth() + 1,
		s = e.getFullYear()
	return a + t + n + t + s
}
function getNepaliFormat(t) {
	var e = t.split('-'),
		n = e[2],
		a = e[1],
		s = e[0]
	return a + '/' + n + '/' + s
}

function convertNos(t) {
	switch (t) {
		case '०':
			return 0
		case '१':
			return 1
		case '२':
			return 2
		case '३':
			return 3
		case '४':
			return 4
		case '५':
			return 5
		case '६':
			return 6
		case '७':
			return 7
		case '८':
			return 8
		case '९':
			return 9
		case '0':
			return '०'
		case '1':
			return '१'
		case '2':
			return '२'
		case '3':
			return '३'
		case '4':
			return '४'
		case '5':
			return '५'
		case '6':
			return '६'
		case '7':
			return '७'
		case '8':
			return '८'
		case '9':
			return '९'
	}
}
function NepaliDateConverter() {
	;(this.bs_date_eq = '09/17/2000'),
		(this.ad_date_eq = '01/01/1944'),
		(this.bs = []),
		(this.bs[2e3] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2001] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2002] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2003] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2004] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2005] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2006] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2007] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2008] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]),
		(this.bs[2009] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2010] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2011] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2012] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
		(this.bs[2013] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2014] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2015] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2016] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
		(this.bs[2017] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2018] = [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2019] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2020] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2021] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2022] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
		(this.bs[2023] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2024] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2025] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2026] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2027] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2028] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2029] = [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2030] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2031] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2032] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2033] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2034] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2035] = [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]),
		(this.bs[2036] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2037] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2038] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2039] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
		(this.bs[2040] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2041] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2042] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2043] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
		(this.bs[2044] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2045] = [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2046] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2047] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2048] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2049] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
		(this.bs[2050] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2051] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2052] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2053] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
		(this.bs[2054] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2055] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2056] = [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2057] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2058] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2059] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2060] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2061] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2062] = [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31]),
		(this.bs[2063] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2064] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2065] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2066] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]),
		(this.bs[2067] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2068] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2069] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2070] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
		(this.bs[2071] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2072] = [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
		(this.bs[2073] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
		(this.bs[2074] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2075] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2076] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
		(this.bs[2077] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
		(this.bs[2078] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2079] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
		(this.bs[2080] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
		(this.bs[2081] = [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
		(this.bs[2082] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
		(this.bs[2083] = [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30]),
		(this.bs[2084] = [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30]),
		(this.bs[2085] = [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30]),
		(this.bs[2086] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
		(this.bs[2087] = [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30]),
		(this.bs[2088] = [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30]),
		(this.bs[2089] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
		(this.bs[2090] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
		(this.count_ad_days = count_ad_days),
		(this.count_bs_days = count_bs_days),
		(this.add_bs_days = add_bs_days),
		(this.add_ad_days = add_ad_days),
		(this.bs2ad = bs2ad),
		(this.ad2bs = ad2bs)
}
function count_ad_days(t, e) {
	var n = 864e5,
		a = t.split('/'),
		s = e.split('/')
	;(a[2] = +a[2]), (a[1] = +a[1]), (a[0] = +a[0]), (s[2] = +s[2]), (s[1] = +s[1]), (s[0] = +s[0])
	var r = new Date(a[2], a[0] - 1, a[1]),
		i = new Date(s[2], s[0] - 1, s[1]),
		d = Math.ceil((i.getTime() - r.getTime()) / n)
	return d
}
function count_bs_days(t, e) {
	var n = t.split('/'),
		a = e.split('/'),
		s = +n[2],
		r = +n[0],
		i = +n[1],
		d = +a[2],
		o = +a[0],
		h = +a[1],
		p = 0,
		l = 0
	for (l = s; d >= l; l++) p += arraySum(this.bs[l])
	for (l = 0; r > l; l++) p -= this.bs[s][l]
	for (p += this.bs[s][11], l = o - 1; l < 12; l++) p -= this.bs[d][l]
	return (p -= i + 1), (p += h - 1)
}
function add_ad_days(t, e) {
	var n = new Date(t)
	return (
		n.setDate(n.getDate() + e),
		(ad_month = n.getMonth() + 1),
		(ad_day = n.getDate()),
		n.getFullYear() + '-' + (ad_month < 10 ? '0' + ad_month : ad_month) + '-' + (ad_day < 10 ? '0' + ad_day : ad_day)
	)
}
function add_bs_days(t, e) {
	var n = t.split('/'),
		a = +n[2],
		s = +n[0],
		r = +n[1]
	for (r += e; r > this.bs[a][s - 1]; ) (r -= this.bs[a][s - 1]), s++, s > 12 && ((s = 1), a++)
	return a + '-' + (s < 10 ? '0' + s : s) + '-' + (r < 10 ? '0' + r : r)
}
function bs2ad(t) {
	return (days_count = this.count_bs_days(this.bs_date_eq, t)), this.add_ad_days(this.ad_date_eq, days_count)
}
function ad2bs(t) {
	return (days_count = this.count_ad_days(this.ad_date_eq, t)), this.add_bs_days(this.bs_date_eq, days_count)
}

module.exports = {
	AD2BS,
	getNepaliMonth,
	getNepaliMonthsInNepali,
	convertNos,
	getCurrentDayName,
}
