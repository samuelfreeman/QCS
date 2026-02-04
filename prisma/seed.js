const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const cities = [
    {
        city_name: 'Kumasi',
        initials: 'KSI',
        suburbs: {
            createMany: {
                data: [
                    {
                        suburb_name: 'Aberem'
                    },
                    {
                        suburb_name: 'Aboabo'
                    },
                    {
                        suburb_name: 'Abrepo'
                    },
                    {
                        suburb_name: 'Abuakwa'
                    },
                    {
                        suburb_name: 'Adako Jachie'
                    },
                    {
                        suburb_name: 'Adehyeman'
                    },
                    {
                        suburb_name: 'Adiebeba'
                    },
                    {
                        suburb_name: 'Adiemmra'
                    },
                    {
                        suburb_name: 'Adoato'
                    },
                    {
                        suburb_name: 'Adukrom'
                    },
                    {
                        suburb_name: 'Adum'
                    },
                    {
                        suburb_name: 'Afrancho'
                    },
                    {
                        suburb_name: 'Agric'
                    },
                    {
                        suburb_name: 'Ahodwo'
                    },
                    {
                        suburb_name: 'Ahwiaa'
                    },
                    {
                        suburb_name: 'Akwatialine'
                    },
                    {
                        suburb_name: 'Amakom'
                    },
                    {
                        suburb_name: 'Amanfrom'
                    },
                    {
                        suburb_name: 'Ampabame'
                    },
                    {
                        suburb_name: 'Anloga'
                    },
                    {
                        suburb_name: 'Anwomaso'
                    },
                    {
                        suburb_name: 'Appiadu'
                    },
                    {
                        suburb_name: 'Aprade'
                    },
                    {
                        suburb_name: 'Asafo'
                    },
                    {
                        suburb_name: 'Asawasi'
                    },
                    {
                        suburb_name: 'Asebi'
                    },
                    {
                        suburb_name: 'Asenua'
                    },
                    {
                        suburb_name: 'Ashtown'
                    },
                    {
                        suburb_name: 'Asokore Mampong'
                    },
                    {
                        suburb_name: 'Asokwa'
                    },
                    {
                        suburb_name: 'Asuofua'
                    },
                    {
                        suburb_name: 'Asuoyeboa'
                    },
                    {
                        suburb_name: 'Atasomanso'
                    },
                    {
                        suburb_name: 'Atimatim'
                    },
                    {
                        suburb_name: 'Atonsu'
                    },
                    {
                        suburb_name: 'Ayeduase'
                    },
                    {
                        suburb_name: 'Ayigya'
                    },
                    {
                        suburb_name: 'Bantama'
                    },
                    {
                        suburb_name: 'Bohyen'
                    },
                    {
                        suburb_name: 'Bomso'
                    },
                    {
                        suburb_name: 'Bremang'
                    },
                    {
                        suburb_name: 'Brofoyedu'
                    },
                    {
                        suburb_name: 'Buoho'
                    },
                    {
                        suburb_name: 'Buokrom Estate'
                    },
                    {
                        suburb_name: 'Daban'
                    },
                    {
                        suburb_name: 'Dakodwon'
                    },
                    {
                        suburb_name: 'Danyame'
                    },
                    {
                        suburb_name: 'Deduako'
                    },
                    {
                        suburb_name: 'Dichemso'
                    },
                    {
                        suburb_name: 'Edwenase'
                    },
                    {
                        suburb_name: 'Fanti New Town'
                    },
                    {
                        suburb_name: 'Gyenyasi'
                    },
                    {
                        suburb_name: 'Kaase'
                    },
                    {
                        suburb_name: 'Kejetia'
                    },
                    {
                        suburb_name: 'Kentikrono'
                    },
                    {
                        suburb_name: 'Kenyase'
                    },
                    {
                        suburb_name: 'Knust'
                    },
                    {
                        suburb_name: 'Konkromase'
                    },
                    {
                        suburb_name: 'Kotei'
                    },
                    {
                        suburb_name: 'Kotwi'
                    },
                    {
                        suburb_name: 'Krofrom'
                    },
                    {
                        suburb_name: 'Kromuase'
                    },
                    {
                        suburb_name: 'Kronum'
                    },
                    {
                        suburb_name: 'Kwadaso'
                    },
                    {
                        suburb_name: 'Kwamo'
                    },
                    {
                        suburb_name: 'Lobito'
                    },
                    {
                        suburb_name: 'Maakro'
                    },
                    {
                        suburb_name: 'Mamponteng'
                    },
                    {
                        suburb_name: 'Manhyia'
                    },
                    {
                        suburb_name: 'Maxima'
                    },
                    {
                        suburb_name: 'Mayanka'
                    },
                    {
                        suburb_name: 'Meduma'
                    },
                    {
                        suburb_name: 'Moeshie Zongo'
                    },
                    {
                        suburb_name: 'New Zongo'
                    },
                    {
                        suburb_name: 'North Suntreso'
                    },
                    {
                        suburb_name: 'Nzema'
                    },
                    {
                        suburb_name: 'Kwaku'
                    },
                    {
                        suburb_name: 'Oduom'
                    },
                    {
                        suburb_name: 'Oforikurom'
                    },
                    {
                        suburb_name: 'Ohwimase'
                    },
                    {
                        suburb_name: 'Pankrono'
                    },
                    {
                        suburb_name: 'Papaase'
                    },
                    {
                        suburb_name: 'Patasi'
                    },
                    {
                        suburb_name: 'Santasi'
                    },
                    {
                        suburb_name: 'Sawaba'
                    },
                    {
                        suburb_name: 'Sepe Brokrom'
                    },
                    {
                        suburb_name: 'Sepe dote'
                    },
                    {
                        suburb_name: 'Sepe Timpom'
                    },
                    {
                        suburb_name: 'Sofoline'
                    },
                    {
                        suburb_name: 'Sokoban'
                    },
                    {
                        suburb_name: 'South Suntreso'
                    },
                    {
                        suburb_name: 'Suame'
                    },
                    {
                        suburb_name: 'Tafo'
                    },
                    {
                        suburb_name: 'Tanoso'
                    },
                    {
                        suburb_name: 'Zongo'
                    }
                ]
            }
        }
    },
    {
        city_name: 'Cape Coast',
        initials: 'CC',
        suburbs: {
            createMany: {
                data: [
                    {
                        suburb_name: 'Abra'
                    },
                    {
                        suburb_name: 'Abura'
                    },
                    {
                        suburb_name: 'Adisadel'
                    },
                    {
                        suburb_name: 'Akotokyire'
                    },
                    {
                        suburb_name: 'Akyim'
                    },
                    {
                        suburb_name: 'Amamoa'
                    },
                    {
                        suburb_name: 'Ankaful'
                    },
                    {
                        suburb_name: 'Ayensu'
                    },
                    {
                        suburb_name: 'Ayensudo'
                    },
                    {
                        suburb_name: 'Bakano'
                    },
                    {
                        suburb_name: 'Brafoyaw'
                    },
                    {
                        suburb_name: 'C-poly'
                    },
                    {
                        suburb_name: 'Cape Coast'
                    },
                    {
                        suburb_name: 'Duakuro'
                    },
                    {
                        suburb_name: 'Eguase'
                    },
                    {
                        suburb_name: 'Ekon'
                    },
                    {
                        suburb_name: 'Elmina'
                    },
                    {
                        suburb_name: 'Esuekyir'
                    },
                    {
                        suburb_name: 'Eyifua'
                    },
                    {
                        suburb_name: 'First Ridge'
                    },
                    {
                        suburb_name: 'Green Hill'
                    },
                    {
                        suburb_name: 'Kakumdo'
                    },
                    {
                        suburb_name: 'Kingsway'
                    },
                    {
                        suburb_name: 'Komenda'
                    },
                    {
                        suburb_name: 'Kotokoraba'
                    },
                    {
                        suburb_name: 'Kwapro'
                    },
                    {
                        suburb_name: 'Kwaprow'
                    },
                    {
                        suburb_name: 'Mfanstipim'
                    },
                    {
                        suburb_name: 'Moree'
                    },
                    {
                        suburb_name: 'Mpeasem'
                    },
                    {
                        suburb_name: 'Nkanfoa'
                    },
                    {
                        suburb_name: 'Nyamoransa'
                    },
                    {
                        suburb_name: 'Ola'
                    },
                    {
                        suburb_name: 'Pedu'
                    },
                    {
                        suburb_name: 'Post Office'
                    },
                    {
                        suburb_name: 'Second Ridge'
                    },
                    {
                        suburb_name: 'Swidu'
                    },
                    {
                        suburb_name: 'Tantri'
                    },
                    {
                        suburb_name: 'Third Ridge'
                    },
                    {
                        suburb_name: 'Ucc new site'
                    },
                    {
                        suburb_name: 'Ucc old site'
                    }
                ]
            }
        }
    },
    {
        city_name: 'Koforidua',
        initials: 'KFD',
        suburbs: {
            createMany: {
                data: [
                    {
                        suburb_name: 'Aboabo'
                    },
                    {
                        suburb_name: 'Aboado'
                    },
                    {
                        suburb_name: 'Abogri'
                    },
                    {
                        suburb_name: 'Abrewa Nkwanta'
                    },
                    {
                        suburb_name: 'Adweso'
                    },
                    {
                        suburb_name: 'Agavenya'
                    },
                    {
                        suburb_name: 'Akwadum'
                    },
                    {
                        suburb_name: 'All Nations New Site'
                    },
                    {
                        suburb_name: 'Anlo Town'
                    },
                    {
                        suburb_name: 'Antotown'
                    },
                    {
                        suburb_name: 'Apenkwa'
                    },
                    {
                        suburb_name: 'Asokore'
                    },
                    {
                        suburb_name: 'Asokore Kuma'
                    },
                    {
                        suburb_name: 'Asorko'
                    },
                    {
                        suburb_name: 'Atekyem'
                    },
                    {
                        suburb_name: 'Baakokrom'
                    },
                    {
                        suburb_name: 'Barrier'
                    },
                    {
                        suburb_name: 'Betom'
                    },
                    {
                        suburb_name: 'Bohye'
                    },
                    {
                        suburb_name: 'Charlie Junction'
                    },
                    {
                        suburb_name: 'Daasebre Estates'
                    },
                    {
                        suburb_name: 'Dabi asem'
                    },
                    {
                        suburb_name: 'Dalriasem'
                    },
                    {
                        suburb_name: 'Effichale'
                    },
                    {
                        suburb_name: 'Effiduase'
                    },
                    {
                        suburb_name: 'Galaway'
                    },
                    {
                        suburb_name: 'Highways'
                    },
                    {
                        suburb_name: 'Jumapo'
                    },
                    {
                        suburb_name: 'K. Poly'
                    },
                    {
                        suburb_name: 'Kantudu'
                    },
                    {
                        suburb_name: 'Kasadjan'
                    },
                    {
                        suburb_name: 'Kentekre'
                    },
                    {
                        suburb_name: 'Kentenkren'
                    },
                    {
                        suburb_name: 'Kofikrom'
                    },
                    {
                        suburb_name: 'Koforidua'
                    },
                    {
                        suburb_name: 'Korle Nkra'
                    },
                    {
                        suburb_name: 'Korley'
                    },
                    {
                        suburb_name: 'Korley Newtown'
                    },
                    {
                        suburb_name: 'Korley Nkwanta'
                    },
                    {
                        suburb_name: 'KTU'
                    },
                    {
                        suburb_name: 'Kukurantumi'
                    },
                    {
                        suburb_name: 'Kurakan'
                    },
                    {
                        suburb_name: 'Liberty'
                    },
                    {
                        suburb_name: 'Lowcost'
                    },
                    {
                        suburb_name: 'Magazine'
                    },
                    {
                        suburb_name: 'Mile 50'
                    },
                    {
                        suburb_name: 'Monroua'
                    },
                    {
                        suburb_name: 'Monrovia'
                    },
                    {
                        suburb_name: 'Nkurakan'
                    },
                    {
                        suburb_name: 'Nsukwao'
                    },
                    {
                        suburb_name: 'Nurse'
                    },
                    {
                        suburb_name: 'Nyamekrom'
                    },
                    {
                        suburb_name: 'Oguaa'
                    },
                    {
                        suburb_name: 'Okorase'
                    },
                    {
                        suburb_name: 'Old Estate'
                    },
                    {
                        suburb_name: 'Opoku Nsiah'
                    },
                    {
                        suburb_name: 'Osabene'
                    },
                    {
                        suburb_name: 'Oyoko'
                    },
                    {
                        suburb_name: 'Pipeline'
                    },
                    {
                        suburb_name: 'Rasta down'
                    },
                    {
                        suburb_name: 'Srodae'
                    },
                    {
                        suburb_name: 'SSNIT'
                    },
                    {
                        suburb_name: 'St James'
                    },
                    {
                        suburb_name: 'Suhyen'
                    },
                    {
                        suburb_name: 'Tafo'
                    },
                    {
                        suburb_name: 'Tei Nkwanta'
                    },
                    {
                        suburb_name: 'Trom'
                    },
                    {
                        suburb_name: 'Two Streams'
                    },
                    {
                        suburb_name: 'Water works'
                    },
                    {
                        suburb_name: 'Zongo'
                    }
                ]
            }
        }
    },
    {
        city_name: 'Greater Accra',
        initials: 'ACC',
        suburbs: {
            createMany: {
                data: [
                    {
                        suburb_name: 'Abeka'
                    },
                    {
                        suburb_name: 'Abelemkpe'
                    },
                    {
                        suburb_name: 'Ablekuma'
                    },
                    {
                        suburb_name: 'Ablekuma Fan-Milk'
                    },
                    {
                        suburb_name: 'Abokobi'
                    },
                    {
                        suburb_name: 'Abosseyokai'
                    },
                    {
                        suburb_name: 'Accra New Town'
                    },
                    {
                        suburb_name: 'Achiaman'
                    },
                    {
                        suburb_name: 'Achimota'
                    },
                    {
                        suburb_name: 'Adabraka'
                    },
                    {
                        suburb_name: 'Adade'
                    },
                    {
                        suburb_name: 'Adam nana'
                    },
                    {
                        suburb_name: 'Adenta'
                    },
                    {
                        suburb_name: 'Adenta Municipality'
                    },
                    {
                        suburb_name: 'Adenta Village'
                    },
                    {
                        suburb_name: 'Adenta West'
                    },
                    {
                        suburb_name: 'Adjiringanor'
                    },
                    {
                        suburb_name: 'Agbogba'
                    },
                    {
                        suburb_name: 'Agbogba Junction'
                    },
                    {
                        suburb_name: 'Airport City'
                    },
                    {
                        suburb_name: 'Airport Hills'
                    },
                    {
                        suburb_name: 'Airport Residential Area'
                    },
                    {
                        suburb_name: 'Airport West'
                    },
                    {
                        suburb_name: 'Akweley'
                    },
                    {
                        suburb_name: 'Akweteyman'
                    },
                    {
                        suburb_name: 'Alajo'
                    },
                    {
                        suburb_name: 'Amanfrom'
                    },
                    {
                        suburb_name: 'Amanhia'
                    },
                    {
                        suburb_name: 'Amasaman'
                    },
                    {
                        suburb_name: 'Ashaley Botwe'
                    },
                    {
                        suburb_name: 'Ashiedu Keteke'
                    },
                    {
                        suburb_name: 'Ashiyie'
                    },
                    {
                        suburb_name: 'Ashongman'
                    },
                    {
                        suburb_name: 'Ashongman Estates'
                    },
                    {
                        suburb_name: 'Asylum Down'
                    },
                    {
                        suburb_name: 'Awoshie'
                    },
                    {
                        suburb_name: 'Broadcasting'
                    },
                    {
                        suburb_name: 'Bubiashie'
                    },
                    {
                        suburb_name: 'Bukom'
                    },
                    {
                        suburb_name: 'Burkie'
                    },
                    {
                        suburb_name: 'Burma Camp'
                    },
                    {
                        suburb_name: 'Burma Hills'
                    },
                    {
                        suburb_name: 'Cantonments'
                    },
                    {
                        suburb_name: 'Cfc Estates, Taifa'
                    },
                    {
                        suburb_name: 'Chorkor'
                    },
                    {
                        suburb_name: 'Christian Borg'
                    },
                    {
                        suburb_name: 'Christian Village'
                    },
                    {
                        suburb_name: 'Circle'
                    },
                    {
                        suburb_name: 'Commandos'
                    },
                    {
                        suburb_name: 'Danfa'
                    },
                    {
                        suburb_name: 'Dansoman'
                    },
                    {
                        suburb_name: 'Darkuman'
                    },
                    {
                        suburb_name: 'Dodowa'
                    },
                    {
                        suburb_name: 'Dome'
                    },
                    {
                        suburb_name: 'Dome Kwabenya'
                    },
                    {
                        suburb_name: 'Domeabra.'
                    },
                    {
                        suburb_name: 'Dzorwulu'
                    },
                    {
                        suburb_name: 'East Legon'
                    },
                    {
                        suburb_name: 'East Legon Hills'
                    },
                    {
                        suburb_name: 'Ecomog'
                    },
                    {
                        suburb_name: 'Frafraha'
                    },
                    {
                        suburb_name: 'Gbawe'
                    },
                    {
                        suburb_name: 'GIMPA'
                    },
                    {
                        suburb_name: 'Gold Coast City'
                    },
                    {
                        suburb_name: 'Haatso'
                    },
                    {
                        suburb_name: 'High Street'
                    },
                    {
                        suburb_name: 'Housing down'
                    },
                    {
                        suburb_name: 'James Town'
                    },
                    {
                        suburb_name: 'Janman'
                    },
                    {
                        suburb_name: 'John Teye'
                    },
                    {
                        suburb_name: 'Kaff university'
                    },
                    {
                        suburb_name: 'Kanda'
                    },
                    {
                        suburb_name: 'Kaneshie'
                    },
                    {
                        suburb_name: 'Kaneshie Maket'
                    },
                    {
                        suburb_name: 'Kantamanto'
                    },
                    {
                        suburb_name: 'Kasoa'
                    },
                    {
                        suburb_name: 'Kasoa C. P'
                    },
                    {
                        suburb_name: 'Kinbu'
                    },
                    {
                        suburb_name: 'Kissieman'
                    },
                    {
                        suburb_name: 'Kokomlemle'
                    },
                    {
                        suburb_name: 'Kokrobite'
                    },
                    {
                        suburb_name: 'Korle Bu'
                    },
                    {
                        suburb_name: 'Korle Gonno'
                    },
                    {
                        suburb_name: 'Kotobabi'
                    },
                    {
                        suburb_name: 'Krispol city'
                    },
                    {
                        suburb_name: 'Kuku Hill'
                    },
                    {
                        suburb_name: 'Kwabenya.'
                    },
                    {
                        suburb_name: 'Kwashieman'
                    },
                    {
                        suburb_name: 'Labadi'
                    },
                    {
                        suburb_name: 'Labone'
                    },
                    {
                        suburb_name: 'Lakeside Estate'
                    },
                    {
                        suburb_name: 'Lamprey mills'
                    },
                    {
                        suburb_name: 'Lapaz'
                    },
                    {
                        suburb_name: 'Lartebiokorshie'
                    },
                    {
                        suburb_name: 'Legon'
                    },
                    {
                        suburb_name: 'Liberia camp'
                    },
                    {
                        suburb_name: 'Lybia Quarters'
                    },
                    {
                        suburb_name: 'Maamobi'
                    },
                    {
                        suburb_name: 'Madina'
                    },
                    {
                        suburb_name: 'Makola'
                    },
                    {
                        suburb_name: 'Mallam'
                    },
                    {
                        suburb_name: 'Mamprobi'
                    },
                    {
                        suburb_name: 'Manet courts'
                    },
                    {
                        suburb_name: 'Mataheko'
                    },
                    {
                        suburb_name: 'McCarthy Hill'
                    },
                    {
                        suburb_name: 'Mile 11'
                    },
                    {
                        suburb_name: 'Millennium city'
                    },
                    {
                        suburb_name: 'Ministries'
                    },
                    {
                        suburb_name: 'Mpoase'
                    },
                    {
                        suburb_name: 'Nana Krom'
                    },
                    {
                        suburb_name: 'New Legon'
                    },
                    {
                        suburb_name: 'New market'
                    },
                    {
                        suburb_name: 'Nii Okaiman'
                    },
                    {
                        suburb_name: 'Nii Okaiman East'
                    },
                    {
                        suburb_name: 'Nima'
                    },
                    {
                        suburb_name: 'Nmai Djor'
                    },
                    {
                        suburb_name: 'North Dzorwulu'
                    },
                    {
                        suburb_name: 'North Industrial Area'
                    },
                    {
                        suburb_name: 'North Kaneshie'
                    },
                    {
                        suburb_name: 'North Legon'
                    },
                    {
                        suburb_name: 'North Ridge'
                    },
                    {
                        suburb_name: 'Norwood City'
                    },
                    {
                        suburb_name: 'Nungua Central'
                    },
                    {
                        suburb_name: 'Nyanyano'
                    },
                    {
                        suburb_name: 'Nyanyano kakraba'
                    },
                    {
                        suburb_name: 'Odorkor'
                    },
                    {
                        suburb_name: 'Ofaakor'
                    },
                    {
                        suburb_name: 'Ofankor'
                    },
                    {
                        suburb_name: 'Ogbodjo'
                    },
                    {
                        suburb_name: 'Okpoi Gonno'
                    },
                    {
                        suburb_name: 'Old Ashongman'
                    },
                    {
                        suburb_name: 'Old barrier'
                    },
                    {
                        suburb_name: 'Opeikuma'
                    },
                    {
                        suburb_name: 'Osu'
                    },
                    {
                        suburb_name: 'Osu Ako-adjei'
                    },
                    {
                        suburb_name: 'Osu Oxford Street'
                    },
                    {
                        suburb_name: 'Osu-re'
                    },
                    {
                        suburb_name: 'Oyarifa'
                    },
                    {
                        suburb_name: 'Oyibi'
                    },
                    {
                        suburb_name: 'Pantang'
                    },
                    {
                        suburb_name: 'Parakuo Estates'
                    },
                    {
                        suburb_name: 'Pleasant Hill'
                    },
                    {
                        suburb_name: 'Pokuase'
                    },
                    {
                        suburb_name: 'Rawlings Park'
                    },
                    {
                        suburb_name: 'Ridge'
                    },
                    {
                        suburb_name: 'Ring Road'
                    },
                    {
                        suburb_name: 'Ritz Junction'
                    },
                    {
                        suburb_name: 'Roman Ridge'
                    },
                    {
                        suburb_name: 'Sabon Zongo'
                    },
                    {
                        suburb_name: 'Santeo'
                    },
                    {
                        suburb_name: 'Shiashie'
                    },
                    {
                        suburb_name: 'South Industrial Area'
                    },
                    {
                        suburb_name: 'Sowutoum'
                    },
                    {
                        suburb_name: 'Sun City'
                    },
                    {
                        suburb_name: 'Tesano'
                    },
                    {
                        suburb_name: 'Teshi'
                    },
                    {
                        suburb_name: 'Teshie'
                    },
                    {
                        suburb_name: 'Trassacco'
                    },
                    {
                        suburb_name: 'Tuba'
                    },
                    {
                        suburb_name: 'Tudu'
                    },
                    {
                        suburb_name: 'Tunga'
                    },
                    {
                        suburb_name: 'UG-Legon'
                    },
                    {
                        suburb_name: 'UPSA'
                    },
                    {
                        suburb_name: 'Ussher Town'
                    },
                    {
                        suburb_name: 'Victoriaborg'
                    },
                    {
                        suburb_name: 'VIP Station'
                    },
                    {
                        suburb_name: 'Weija'
                    },
                    {
                        suburb_name: 'West land'
                    },
                    {
                        suburb_name: 'West Legon'
                    },
                    {
                        suburb_name: 'West Ridge'
                    },
                    {
                        suburb_name: 'Westhills'
                    },
                    {
                        suburb_name: 'Winconsin Int.'
                    }
                ]
            }
        }
    },
    {
        city_name: 'Tamale',
        initials: 'TML',
        suburbs: {
            createMany: {
                data: [
                    {
                        suburb_name: 'Checko'
                    },
                    {
                        suburb_name: 'Jekeriyili'
                    },
                    {
                        suburb_name: 'Kaakpayilli'
                    },
                    {
                        suburb_name: 'Kalpohin Estates'
                    },
                    {
                        suburb_name: 'Lamashigu'
                    },
                    {
                        suburb_name: 'Moshie Zongo'
                    },
                    {
                        suburb_name: 'Nyanshegu'
                    },
                    {
                        suburb_name: 'Sakasak'
                    }
                ]
            }
        }
    },
    {
        city_name: 'Takoradi',
        initials: 'TKD',
        suburbs: {
            createMany: {
                data: [
                    {
                        suburb_name: 'Aboadze'
                    },
                    {
                        suburb_name: 'Abutumagyebu'
                    },
                    {
                        suburb_name: 'Adiembra'
                    },
                    {
                        suburb_name: 'Adientan'
                    },
                    {
                        suburb_name: 'Adientsem'
                    },
                    {
                        suburb_name: 'Airforce BU'
                    },
                    {
                        suburb_name: 'Airport Ridge'
                    },
                    {
                        suburb_name: 'Anaji'
                    },
                    {
                        suburb_name: 'Apolo'
                    },
                    {
                        suburb_name: 'Apowa'
                    },
                    {
                        suburb_name: 'Apremdo'
                    },
                    {
                        suburb_name: 'Assakae'
                    },
                    {
                        suburb_name: 'Bankyiase'
                    },
                    {
                        suburb_name: 'Beach Road'
                    },
                    {
                        suburb_name: 'Bronyikrom'
                    },
                    {
                        suburb_name: 'Chapel Hill'
                    },
                    {
                        suburb_name: 'Effia Nkwanta'
                    },
                    {
                        suburb_name: 'Effiakuma'
                    },
                    {
                        suburb_name: 'Essia'
                    },
                    {
                        suburb_name: 'Essikado'
                    },
                    {
                        suburb_name: 'Essipon'
                    },
                    {
                        suburb_name: 'Fijai'
                    },
                    {
                        suburb_name: 'Inehaban'
                    },
                    {
                        suburb_name: 'Kasawurdo'
                    },
                    {
                        suburb_name: 'Kegedir'
                    },
                    {
                        suburb_name: 'Keteen'
                    },
                    {
                        suburb_name: 'Kojokrom'
                    },
                    {
                        suburb_name: 'Kweikuma'
                    },
                    {
                        suburb_name: 'Kwesimintsim'
                    },
                    {
                        suburb_name: 'Mapees'
                    },
                    {
                        suburb_name: 'Market Circle'
                    },
                    {
                        suburb_name: 'Mpatado'
                    },
                    {
                        suburb_name: 'Mpintsin'
                    },
                    {
                        suburb_name: 'New Amanful'
                    },
                    {
                        suburb_name: 'New Takoradi'
                    },
                    {
                        suburb_name: 'Ngyiresia'
                    },
                    {
                        suburb_name: 'Nkroful'
                    },
                    {
                        suburb_name: 'Ntankoful'
                    },
                    {
                        suburb_name: 'Pipe Ano'
                    },
                    {
                        suburb_name: 'Secondi'
                    },
                    {
                        suburb_name: 'Takoradi'
                    },
                    {
                        suburb_name: 'Tanakrom'
                    },
                    {
                        suburb_name: 'Whindo'
                    },
                    {
                        suburb_name: 'Aboadze'
                    },
                    {
                        suburb_name: 'Abuesi'
                    },
                    {
                        suburb_name: 'Adiembra'
                    },
                    {
                        suburb_name: 'Agona'
                    },
                    {
                        suburb_name: 'Airport Ridge'
                    },
                    {
                        suburb_name: 'Anaji'
                    },
                    {
                        suburb_name: 'Apowaa'
                    },
                    {
                        suburb_name: 'Apremdo'
                    },
                    {
                        suburb_name: 'Baka-Ekyir'
                    },
                    {
                        suburb_name: 'Bakaekyir'
                    },
                    {
                        suburb_name: 'Beach Road'
                    },
                    {
                        suburb_name: 'Beahu'
                    },
                    {
                        suburb_name: 'Bokoro'
                    },
                    {
                        suburb_name: 'BU'
                    },
                    {
                        suburb_name: 'Diabene'
                    },
                    {
                        suburb_name: 'Effia'
                    },
                    {
                        suburb_name: 'Effia nkwanta'
                    },
                    {
                        suburb_name: 'Effia Nkwanta Hospital'
                    },
                    {
                        suburb_name: 'Effiakuma'
                    },
                    {
                        suburb_name: 'Egyam'
                    },
                    {
                        suburb_name: 'Ekuase'
                    },
                    {
                        suburb_name: 'Esaaman'
                    },
                    {
                        suburb_name: 'Essaman'
                    },
                    {
                        suburb_name: 'Essikado'
                    },
                    {
                        suburb_name: 'Essipong'
                    },
                    {
                        suburb_name: 'Ewusiejo'
                    },
                    {
                        suburb_name: 'Fijai'
                    },
                    {
                        suburb_name: 'Funko'
                    },
                    {
                        suburb_name: 'Kansaworodo'
                    },
                    {
                        suburb_name: 'Kejabil'
                    },
                    {
                        suburb_name: 'Ketan'
                    },
                    {
                        suburb_name: 'Kweikuma'
                    },
                    {
                        suburb_name: 'Kwesimintim'
                    },
                    {
                        suburb_name: 'Kwesimintsim'
                    },
                    {
                        suburb_name: 'Lagos Town'
                    },
                    {
                        suburb_name: 'Market Circle'
                    },
                    {
                        suburb_name: 'Mpintsin'
                    },
                    {
                        suburb_name: 'New Amanful'
                    },
                    {
                        suburb_name: 'New Tardi'
                    },
                    {
                        suburb_name: 'Nkontompo'
                    },
                    {
                        suburb_name: 'Nkotonpo'
                    },
                    {
                        suburb_name: 'Nkroful Junction'
                    },
                    {
                        suburb_name: 'Pipe Ano'
                    },
                    {
                        suburb_name: 'Race course'
                    },
                    {
                        suburb_name: 'Sekondi'
                    },
                    {
                        suburb_name: 'Shama'
                    },
                    {
                        suburb_name: 'T Poly'
                    },
                    {
                        suburb_name: 'Tano Krom'
                    },
                    {
                        suburb_name: 'Tanokrom'
                    }
                ]
            }
        }
    },
    {
        city_name: 'Ho',
        initials: 'HO',
        suburbs: {
            createMany: {
                data: [
                    {
                        suburb_name: 'Ahoe'
                    },
                    {
                        suburb_name: 'Akpenamawu'
                    },
                    {
                        suburb_name: 'Alaye'
                    },
                    {
                        suburb_name: 'Area 52'
                    },
                    {
                        suburb_name: 'Bankoe'
                    },
                    {
                        suburb_name: 'Barracks New Town'
                    },
                    {
                        suburb_name: 'Bentotal'
                    },
                    {
                        suburb_name: 'Civic Center'
                    },
                    {
                        suburb_name: 'CK Road'
                    },
                    {
                        suburb_name: 'Dabra'
                    },
                    {
                        suburb_name: 'Dave'
                    },
                    {
                        suburb_name: 'Deme'
                    },
                    {
                        suburb_name: 'Dome'
                    },
                    {
                        suburb_name: 'Godokpe'
                    },
                    {
                        suburb_name: 'Guinness'
                    },
                    {
                        suburb_name: 'Ho'
                    },
                    {
                        suburb_name: 'Ho Market Area'
                    },
                    {
                        suburb_name: 'Ho Poly'
                    },
                    {
                        suburb_name: 'Ho Town'
                    },
                    {
                        suburb_name: 'Lokoe'
                    },
                    {
                        suburb_name: 'Mawuli Estate'
                    },
                    {
                        suburb_name: 'Medical Village'
                    },
                    {
                        suburb_name: 'Mirage'
                    },
                    {
                        suburb_name: 'Muwuli School Area'
                    },
                    {
                        suburb_name: 'Ola'
                    },
                    {
                        suburb_name: 'Power House'
                    },
                    {
                        suburb_name: 'PWD'
                    },
                    {
                        suburb_name: 'Redeem'
                    },
                    {
                        suburb_name: 'SSNIT Flats'
                    },
                    {
                        suburb_name: 'Total'
                    },
                    {
                        suburb_name: 'Trafalgar'
                    },
                    {
                        suburb_name: 'UHAS New Site'
                    },
                    {
                        suburb_name: 'Zongo'
                    }
                ]
            }
        }
    }
];

async function main() {
    await Promise.all([
        cities.map(async item => {
            await prisma.cities.create({
                data: {
                    city_name: item.city_name,
                    initials: item.initials,
                    suburbs: item.suburbs
                }
            });
        })
    ]);

    // await prisma.cities.createMany({
    //     // data: cities,
    //     data: [
    //         {
    //             city_name
    //         }
    //     ],
    //     skipDuplicates: true
    // });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
