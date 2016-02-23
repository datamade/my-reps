
var API_KEY = 'AIzaSyA-CGHzz9lN_tkp1Uego2dqRG_1XBPlCJA';
var INFO_API = 'https://www.googleapis.com/civicinfo/v2/representatives';

// parsing out division IDs
var federal_pattern = "ocd-division/country:us";
var state_pattern = /ocd-division\/country:us\/state:(\D{2}$)/;
var cd_pattern = /ocd-division\/country:us\/state:(\D{2})\/cd:/;
var sl_pattern = /ocd-division\/country:us\/state:(\D{2})\/(sldl:|sldu:)/;
var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;

var federal_offices = ['United States Senate', 'United States House of Representatives']

var social_icon_lookup = {
    'YouTube': 'youtube',
    'Facebook': 'facebook',
    'Twitter': 'twitter',
    'GooglePlus': 'google-plus'
};

var social_link_lookup = {
    'YouTube': 'https://www.youtube.com/user/',
    'Facebook': 'https://www.facebook.com/',
    'Twitter': 'https://twitter.com/',
    'GooglePlus': 'https://plus.google.com/'
};

var selected_state = '';
var selected_county = '';
var selected_local = '';

function addressSearch() {
    var address = $('#address').val();
    $.address.parameter('address', encodeURIComponent(address));

    var params = {
        'key': API_KEY,
        'address': address
    }
    $.when($.getJSON(INFO_API, params)).then(function(data){
        var divisions = data['divisions'];
        var officials = data['officials'];
        var offices = data['offices'];

        $('table tbody').empty();

        var federal_people = [];
        var state_people = [];
        var county_people = [];
        var local_people = [];

        // console.log(data);

        $.each(divisions, function(division_id, division){
            // console.log(division.name);
            if (typeof division.officeIndices !== 'undefined'){
                
                $.each(division.officeIndices, function(i, office){
                    var office_name = offices[office];

                    $.each(offices[office]['officialIndices'], function(i, official){
                        var info = {
                            'person': null,
                            'office': office_name,
                            'channels': null,
                            'phones': null,
                            'urls': null,
                            'emails': null,
                            'division_id': division_id
                        };


                        // console.log(officials[official])
                        var person = officials[official];
                        info['person'] = person;

                        if (typeof person.channels !== 'undefined'){
                            var channels = [];
                            $.each(person.channels, function(i, channel){
                                if (channel.type != 'GooglePlus' && channel.type != 'YouTube') {
                                    channel['icon'] = social_icon_lookup[channel.type];
                                    channel['link'] = social_link_lookup[channel.type] + channel['id'];
                                    channels.push(channel);
                                }
                            });
                            info['channels'] = channels;
                        }
                        if (typeof person.phones !== 'undefined'){
                            info['phones'] = person.phones;
                        }
                        if (typeof person.urls !== 'undefined'){
                            info['urls'] = person.urls;
                        }
                        if (typeof person.emails !== 'undefined'){
                            info['emails'] = person.emails;
                        }

                        if(checkFederal(division_id, office_name)) {
                            federal_people.push(info);
                        } else if (checkState(division_id)) {
                            state_people.push(info);
                        } else if (checkCounty(division_id)){
                            county_people.push(info);
                        } else {
                            local_people.push(info);
                        }

                    });

                });
            }
        });

        var template = new EJS({'text': $('#tableGuts').html()});
        
        $('#federal-results tbody').append(template.render({people: federal_people}));
        $('#state-results tbody').append(template.render({people: state_people}));
        $('#county-results tbody').append(template.render({people: county_people}));
        $('#local-results tbody').append(template.render({people: local_people}));
        $('#response-container').show();
    });
}

function checkFederal(division_id, office_name) {
    if( division_id == federal_pattern || 
        cd_pattern.test(division_id) ||
        federal_offices.indexOf(office_name.name) >= 0)
        return true;
    else
        return false; 
}

function checkState(division_id){
    if( state_pattern.test(division_id) ||
        sl_pattern.test(division_id))
        return true;
    else
        return false; 
}

function checkCounty(division_id){
    if( county_pattern.test(division_id))
        return true;
    else
        return false; 
}

//converts a slug or query string in to readable text
function convertToPlainString(text) {
    if (text === undefined) return '';
    return decodeURIComponent(text);
};
