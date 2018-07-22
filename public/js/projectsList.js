'use strict';

const MOCK_PROJECTS_LIST = {
    "projectsList": [
        {
            "id": "1111111",
            "companyName": "company1",
            "projectName": "project1",
            "projectStatus": "active",
            "startigDate": "06/09/2018",
            "endingDate": "",
            "totalHours": 17,
            tasks: [
                {
                    "description": "Added sign-in page",
                    "hours": 5,
                },
                {
                    "description": "Fixed bug #1265",
                    "hours": 12,
                }
            ]
        },
        {
            "id": "2222222",
            "companyName": "company2",
            "projectName": "project12",
            "projectStatus": "active",
            "startigDate": "05/12/2018",
            "endingDate": "",
            "totalHours": 43,
            tasks: [
                {
                    "description": "Redesigned front page",
                    "hours": 20,
                },
                {
                    "description": "Added new fields to DB.",
                    "hours": 3,
                },
                {
                    "description": "Moved db from sql server to mysql",
                    "hours": 20,
                }
            ]
        },
        {
            "id": "3333333",
            "companyName": "company3",
            "projectName": "project3",
            "projectStatus": "active",
            "startigDate": "01/09/2018",
            "endingDate": "",
            "totalHours": 33,
            tasks: [
                {
                    "description": "Worked on server crashing issue",
                    "hours": 33,
                }
            ]
        },
        {
            "id": "4444444",
            "companyName": "company4",
            "projectName": "project4",
            "projectStatus": "Waiting for payment",
            "startigDate": "12/08/2017",
            "endingDate": "06/15/2018",
            "totalHours": "50",
            tasks: [
                {
                    "description": "Added an about us page",
                    "hours": 3,
                },
                {
                    "description": "Changed content in the pricing page",
                    "hours": 1,
                },
                {
                    "description": "Built a new web site",
                    "hours": 40,
                }
            ]
        }
    ]
};

function getProjectsList(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_PROJECTS_LIST)}, 100);
}

// Note: this function can stay the same when we connect
// to real API later
function displayProjects(data) {
    for (let listItem in data.projectsList) {
        let item = data.projectsList[listItem];
       	$('body').append(
        '<p>' + item.companyName + '</p>');
		for (let item1 in item.tasks) {
       		$('body').append(
        	'<p>' + item.tasks[item1].description + '</p>');
    	}
    }
}

// Note: this function can stay the same when we
// connect to real API later
function displayProjectsList() {
    getProjectsList(displayProjects);
}

function handleProjectsList() {
    displayProjectsList();
}

$(displayProjectsList);