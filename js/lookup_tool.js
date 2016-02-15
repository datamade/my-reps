(function(){
    var API_KEY = 'AIzaSyA-CGHzz9lN_tkp1Uego2dqRG_1XBPlCJA';
    var INFO_API = 'https://www.googleapis.com/civicinfo/v2/representatives';

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

    $('#address-search').on('click', function(e){
        e.preventDefault();
        var address = $('#address').val();
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

            console.log(data);

            $.each(divisions, function(division_id, division){
                console.log(division_id);
                if (typeof division.officeIndices !== 'undefined'){
                    var info = {
                        'person': null,
                        'office': null,
                        'channels': null,
                        'phones': null,
                        'urls': null,
                        'emails': null,
                        'division_id': division_id
                    };
                    $.each(division.officeIndices, function(i, office){

                        info['office'] = offices[office]

                        $.each(offices[office]['officialIndices'], function(i, official){

                            var person = officials[official];
                            info['person'] = person;

                            if (typeof person.channels !== 'undefined'){
                                var channels = [];
                                $.each(person.channels, function(i, channel){
                                    channel['icon'] = social_icon_lookup[channel.type];
                                    channel['link'] = social_link_lookup[channel.type] + channel['id'];
                                    channels.push(channel);
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

                            var state_pattern = /ocd-division\/country:us\/state:(?=\D{2}$)/;
                            var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/

                            if(division_id == "ocd-division/country:us") {
                                federal_people.push(info);
                            } else if (state_pattern.test(division_id)) {
                                state_people.push(info);
                            } else if (county_pattern.test(division_id)){
                                county_people.push(info);
                            } else {
                                local_people.push(info);
                            }

                        })

                    })
                }
            });

            // var template = new EJS({'text': $('#tableGuts').html()});
            // $('table tbody').append(template.render(info));

            // $('table').show();
        })
    })

})()
