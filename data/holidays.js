// National holidays for selected countries
const countryHolidays = {
    "ES": { // Spain
        "holidays": [
            { "date": "01-01", "name": "Año Nuevo", "localName": "Año Nuevo" },
            { "date": "01-06", "name": "Día de Reyes", "localName": "Día de Reyes" },
            { "date": "04-06", "name": "Viernes Santo", "localName": "Viernes Santo", "variable": true },
            { "date": "05-01", "name": "Día del Trabajo", "localName": "Día del Trabajo" },
            { "date": "08-15", "name": "Asunción de la Virgen", "localName": "Asunción de la Virgen" },
            { "date": "10-12", "name": "Día de la Hispanidad", "localName": "Día de la Hispanidad" },
            { "date": "11-01", "name": "Día de Todos los Santos", "localName": "Día de Todos los Santos" },
            { "date": "12-06", "name": "Día de la Constitución", "localName": "Día de la Constitución" },
            { "date": "12-08", "name": "Inmaculada Concepción", "localName": "Inmaculada Concepción" },
            { "date": "12-25", "name": "Navidad", "localName": "Navidad" }
        ],
        "workingHours": "Lun-Vie: 9:00-14:00, 16:00-19:00; Es común la siesta por las tardes",
        "businessCulture": "Enfocado en relaciones; almuerzos de negocios importantes; muchas empresas cierran en agosto por vacaciones"
    },
    "FR": { // France
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "Jour de l'an" },
            { "date": "04-05", "name": "Easter Monday", "localName": "Lundi de Pâques", "variable": true },
            { "date": "05-01", "name": "Labor Day", "localName": "Fête du Travail" },
            { "date": "05-08", "name": "Victory in Europe Day", "localName": "Victoire 1945" },
            { "date": "05-13", "name": "Ascension Day", "localName": "Ascension", "variable": true },
            { "date": "05-24", "name": "Whit Monday", "localName": "Lundi de Pentecôte", "variable": true },
            { "date": "07-14", "name": "Bastille Day", "localName": "Fête nationale" },
            { "date": "08-15", "name": "Assumption Day", "localName": "Assomption" },
            { "date": "11-01", "name": "All Saints' Day", "localName": "Toussaint" },
            { "date": "11-11", "name": "Armistice Day", "localName": "Armistice 1918" },
            { "date": "12-25", "name": "Christmas Day", "localName": "Noël" }
        ],
        "workingHours": "Lun-Vie: 9:00-18:00; Pausas largas para almuerzo; semana laboral de 35 horas",
        "businessCulture": "Cultura de negocios formal; se aprecia la puntualidad; agosto es mes de vacaciones"
    },
    "IT": { // Italy
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "Capodanno" },
            { "date": "01-06", "name": "Epiphany", "localName": "Epifania" },
            { "date": "04-04", "name": "Easter Monday", "localName": "Lunedì dell'Angelo", "variable": true },
            { "date": "04-25", "name": "Liberation Day", "localName": "Festa della Liberazione" },
            { "date": "05-01", "name": "Labor Day", "localName": "Festa del Lavoro" },
            { "date": "06-02", "name": "Republic Day", "localName": "Festa della Repubblica" },
            { "date": "08-15", "name": "Assumption Day", "localName": "Ferragosto" },
            { "date": "11-01", "name": "All Saints' Day", "localName": "Tutti i Santi" },
            { "date": "12-08", "name": "Immaculate Conception", "localName": "Immacolata Concezione" },
            { "date": "12-25", "name": "Christmas Day", "localName": "Natale" },
            { "date": "12-26", "name": "St. Stephen's Day", "localName": "Santo Stefano" }
        ],
        "workingHours": "Lun-Vie: 9:00-13:00, 14:30-18:00; Muchas empresas cierran en agosto",
        "businessCulture": "Basado en relaciones; conexiones personales importantes; pausa por la tarde (riposo) común"
    },
    "DE": { // Germany
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "Neujahr" },
            { "date": "04-02", "name": "Good Friday", "localName": "Karfreitag", "variable": true },
            { "date": "04-05", "name": "Easter Monday", "localName": "Ostermontag", "variable": true },
            { "date": "05-01", "name": "Labor Day", "localName": "Tag der Arbeit" },
            { "date": "05-13", "name": "Ascension Day", "localName": "Christi Himmelfahrt", "variable": true },
            { "date": "05-24", "name": "Whit Monday", "localName": "Pfingstmontag", "variable": true },
            { "date": "10-03", "name": "German Unity Day", "localName": "Tag der Deutschen Einheit" },
            { "date": "12-25", "name": "Christmas Day", "localName": "Erster Weihnachtsfeiertag" },
            { "date": "12-26", "name": "Second Christmas Day", "localName": "Zweiter Weihnachtsfeiertag" }
        ],
        "workingHours": "Lun-Vie: 8:00-17:00; Se valora la puntualidad; es común tener horario reducido los viernes",
        "businessCulture": "Estilo de comunicación directo; gran énfasis en la puntualidad; ambiente de negocios formal"
    },
    "PT": { // Portugal
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "Ano Novo" },
            { "date": "04-02", "name": "Good Friday", "localName": "Sexta-feira Santa", "variable": true },
            { "date": "04-25", "name": "Liberty Day", "localName": "Dia da Liberdade" },
            { "date": "05-01", "name": "Labor Day", "localName": "Dia do Trabalhador" },
            { "date": "06-10", "name": "Portugal Day", "localName": "Dia de Portugal" },
            { "date": "08-15", "name": "Assumption Day", "localName": "Assunção de Nossa Senhora" },
            { "date": "10-05", "name": "Republic Day", "localName": "Implantação da República" },
            { "date": "11-01", "name": "All Saints' Day", "localName": "Dia de Todos os Santos" },
            { "date": "12-01", "name": "Independence Restoration Day", "localName": "Restauração da Independência" },
            { "date": "12-08", "name": "Immaculate Conception", "localName": "Imaculada Conceição" },
            { "date": "12-25", "name": "Christmas Day", "localName": "Natal" }
        ],
        "workingHours": "Lun-Vie: 9:00-18:00; Pausas para almuerzo suelen durar 1-2 horas",
        "businessCulture": "Orientado a relaciones; las reuniones pueden comenzar más tarde de lo programado; agosto es el mes principal de vacaciones"
    },
    "NL": { // Netherlands
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "Nieuwjaarsdag" },
            { "date": "04-04", "name": "Easter Monday", "localName": "Tweede Paasdag", "variable": true },
            { "date": "04-27", "name": "King's Day", "localName": "Koningsdag" },
            { "date": "05-05", "name": "Liberation Day", "localName": "Bevrijdingsdag" },
            { "date": "05-13", "name": "Ascension Day", "localName": "Hemelvaartsdag", "variable": true },
            { "date": "05-24", "name": "Whit Monday", "localName": "Tweede Pinksterdag", "variable": true },
            { "date": "12-25", "name": "Christmas Day", "localName": "Eerste Kerstdag" },
            { "date": "12-26", "name": "Second Christmas Day", "localName": "Tweede Kerstdag" }
        ],
        "workingHours": "Lun-Vie: 9:00-17:00; Común el trabajo a tiempo parcial; buen equilibrio vida-trabajo",
        "businessCulture": "Comunicación directa; puntualidad importante; ambiente informal pero profesional"
    },
    "GB": { // United Kingdom
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "New Year's Day" },
            { "date": "04-02", "name": "Good Friday", "localName": "Good Friday", "variable": true },
            { "date": "04-05", "name": "Easter Monday", "localName": "Easter Monday", "variable": true },
            { "date": "05-03", "name": "Early May Bank Holiday", "localName": "Early May Bank Holiday" },
            { "date": "05-31", "name": "Spring Bank Holiday", "localName": "Spring Bank Holiday" },
            { "date": "08-30", "name": "Summer Bank Holiday", "localName": "Summer Bank Holiday" },
            { "date": "12-25", "name": "Christmas Day", "localName": "Christmas Day" },
            { "date": "12-26", "name": "Boxing Day", "localName": "Boxing Day" }
        ],
        "workingHours": "Lun-Vie: 9:00-17:30; Muchas oficinas cierran entre Navidad y Año Nuevo",
        "businessCulture": "Profesional y formal; se valora la puntualidad; se prefiere el correo electrónico para el contacto inicial"
    },
    "US": { // United States
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "New Year's Day" },
            { "date": "01-17", "name": "Martin Luther King Jr. Day", "localName": "Martin Luther King Jr. Day" },
            { "date": "02-21", "name": "Presidents' Day", "localName": "Presidents' Day" },
            { "date": "05-30", "name": "Memorial Day", "localName": "Memorial Day" },
            { "date": "06-19", "name": "Juneteenth", "localName": "Juneteenth" },
            { "date": "07-04", "name": "Independence Day", "localName": "Independence Day" },
            { "date": "09-05", "name": "Labor Day", "localName": "Labor Day" },
            { "date": "10-10", "name": "Columbus Day", "localName": "Columbus Day" },
            { "date": "11-11", "name": "Veterans Day", "localName": "Veterans Day" },
            { "date": "11-24", "name": "Thanksgiving", "localName": "Thanksgiving" },
            { "date": "12-25", "name": "Christmas Day", "localName": "Christmas Day" }
        ],
        "workingHours": "Lun-Vie: 9:00-17:00; Dos semanas de vacaciones anuales común; varía según la empresa",
        "businessCulture": "Comunicación directa; se espera puntualidad; correo electrónico y llamadas telefónicas comunes para negocios"
    },
    "MX": { // Mexico
        "holidays": [
            { "date": "01-01", "name": "Año Nuevo", "localName": "Año Nuevo" },
            { "date": "02-05", "name": "Día de la Constitución", "localName": "Día de la Constitución" },
            { "date": "03-21", "name": "Natalicio de Benito Juárez", "localName": "Natalicio de Benito Juárez" },
            { "date": "05-01", "name": "Día del Trabajo", "localName": "Día del Trabajo" },
            { "date": "09-16", "name": "Día de la Independencia", "localName": "Día de la Independencia" },
            { "date": "11-02", "name": "Día de los Muertos", "localName": "Día de los Muertos" },
            { "date": "11-20", "name": "Día de la Revolución", "localName": "Día de la Revolución" },
            { "date": "12-12", "name": "Día de la Virgen de Guadalupe", "localName": "Día de la Virgen de Guadalupe" },
            { "date": "12-25", "name": "Navidad", "localName": "Navidad" }
        ],
        "workingHours": "Lun-Vie: 9:00-18:00; Pausas largas para almuerzo; muchas empresas cierran 2-3 semanas en diciembre",
        "businessCulture": "Enfocado en relaciones; puntualidad menos estricta; las reuniones pueden comenzar tarde; se valoran las conexiones personales"
    },
    "TR": { // Turkey
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "Yılbaşı" },
            { "date": "04-23", "name": "National Sovereignty and Children's Day", "localName": "Ulusal Egemenlik ve Çocuk Bayramı" },
            { "date": "05-01", "name": "Labor Day", "localName": "Emek ve Dayanışma Günü" },
            { "date": "05-19", "name": "Commemoration of Atatürk, Youth and Sports Day", "localName": "Atatürk'ü Anma, Gençlik ve Spor Bayramı" },
            { "date": "07-15", "name": "Democracy and National Unity Day", "localName": "Demokrasi ve Milli Birlik Günü" },
            { "date": "08-30", "name": "Victory Day", "localName": "Zafer Bayramı" },
            { "date": "10-29", "name": "Republic Day", "localName": "Cumhuriyet Bayramı" },
            { "date": "04-12", "name": "Ramadan Feast", "localName": "Ramazan Bayramı", "variable": true },
            { "date": "06-19", "name": "Sacrifice Feast", "localName": "Kurban Bayramı", "variable": true }
        ],
        "workingHours": "Lun-Vie: 8:30-17:30; Algunos negocios abren los sábados por la mañana",
        "businessCulture": "Orientado a relaciones; la hospitalidad es importante; las reuniones de negocios a menudo incluyen té o café"
    },
    "PL": { // Poland
        "holidays": [
            { "date": "01-01", "name": "New Year's Day", "localName": "Nowy Rok" },
            { "date": "01-06", "name": "Epiphany", "localName": "Trzech Króli" },
            { "date": "04-04", "name": "Easter Monday", "localName": "Poniedziałek Wielkanocny", "variable": true },
            { "date": "05-01", "name": "Labor Day", "localName": "Święto Pracy" },
            { "date": "05-03", "name": "Constitution Day", "localName": "Święto Konstytucji 3 Maja" },
            { "date": "05-23", "name": "Pentecost Sunday", "localName": "Zielone Świątki", "variable": true },
            { "date": "06-03", "name": "Corpus Christi", "localName": "Boże Ciało", "variable": true },
            { "date": "08-15", "name": "Assumption Day", "localName": "Wniebowzięcie Najświętszej Maryi Panny" },
            { "date": "11-01", "name": "All Saints' Day", "localName": "Wszystkich Świętych" },
            { "date": "11-11", "name": "Independence Day", "localName": "Narodowe Święto Niepodległości" },
            { "date": "12-25", "name": "Christmas Day", "localName": "Boże Narodzenie" },
            { "date": "12-26", "name": "Second Christmas Day", "localName": "Drugi Dzień Świąt" }
        ],
        "workingHours": "Lun-Vie: 8:00-16:00; La mayoría de los negocios cierran los domingos",
        "businessCulture": "Cultura de negocios formal; puntualidad importante; estructura jerárquica común"
    }
};
