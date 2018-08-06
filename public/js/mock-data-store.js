const MOCK_PROJECTS_LIST = {
    "projectsList": [
        {
            "id": "1111111",
            "companyName": "company1",
            "projectName": "project1",
            "projectStatus": "active",
            "startingDate": "06/09/2018",
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
            "startingDate": "05/12/2018",
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
            "startingDate": "01/09/2018",
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
            "startingDate": "12/08/2017",
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