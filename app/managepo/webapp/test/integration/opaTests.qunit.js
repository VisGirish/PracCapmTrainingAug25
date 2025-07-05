sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'bosch/po/managepo/test/integration/FirstJourney',
		'bosch/po/managepo/test/integration/pages/POsList',
		'bosch/po/managepo/test/integration/pages/POsObjectPage',
		'bosch/po/managepo/test/integration/pages/POItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, POsList, POsObjectPage, POItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('bosch/po/managepo') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePOsList: POsList,
					onThePOsObjectPage: POsObjectPage,
					onThePOItemsObjectPage: POItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);