const listForm = [
    {
        id: 0,
        position: true,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: false},
    },
    {
        id: 1,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: false, required: false},
    },
    {
        id: 2,
        position: true,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: true},
    },
    {
        id: 3,
        position: true,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: true},
    },
    {
        id: 4,
        position: true,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: true},
    },
    {
        id: 5,
        position: true,
        bedRooms: {display: false, required: false},
        bathRooms: {display: false, required: false},
        numberFloor: {display: false, required: false},
    },
    {
        id: 6,
        position: true,
        bedRooms: {display: false, required: false},
        bathRooms: {display: false, required: false},
        numberFloor: {display: false, required: false},
    },
    {
        id: 7,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: false, required: false},
    },
    {
        id: 8,
        position: true,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: true},
    },
    {
        id: 9,
        position: true,
        bedRooms: {display: false, required: false},
        bathRooms: {display: false, required: false},
        numberFloor: {display: true, required: true},
    },
    {
        id: 10,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: false, required: false},
    },
    {
        id: 11,
        position: true,
        bedRooms: {display: true, required: false},
        bathRooms: {display: true, required: false},
        numberFloor: {display: true, required: false},
    },
    {
        id: 12,
        position: false,
        bedRooms: {display: true, required: false},
        bathRooms: {display: true, required: false},
        numberFloor: {display: true, required: false},
    },
    {
        id: 13,
        position: false,
        bedRooms: {display: true, required: false},
        bathRooms: {display: true, required: false},
        numberFloor: {display: false, required: false},
    },
    {
        id: 14,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: false, required: false},
    },
    {
        id: 15,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: false, required: false},
    },
    {
        id: 16,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: true},
    },
    {
        id: 17,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: true},
    },
    {
        id: 18,
        position: true,
        bedRooms: {display: true, required: false},
        bathRooms: {display: true, required: false},
        numberFloor: {display: true, required: false},
    },
    {
        id: 19,
        position: true,
        bedRooms: {display: false, required: false},
        bathRooms: {display: false, required: false},
        numberFloor: {display: false, required: false},
    },
    {
        id: 20,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: true},
    },
    {
        id: 21,
        position: true,
        bedRooms: {display: true, required: false},
        bathRooms: {display: true, required: false},
        numberFloor: {display: true, required: false},
    },
    {
        id: 22,
        position: true,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: true, required: false},
    },
    {
        id: 23,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: false, required: false},
    },
    {
        id: 24,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: false, required: false},
    },
    {
        id: 25,
        position: false,
        bedRooms: {display: true, required: true},
        bathRooms: {display: true, required: true},
        numberFloor: {display: false, required: false},
    },
    {
        id: 26,
        position: false,
        bedRooms: {display: true, required: false},
        bathRooms: {display: true, required: false},
        numberFloor: {display: true, required: false},
    },
    {
        id: 27,
        position: false,
        bedRooms: {display: false, required: false},
        bathRooms: {display: false, required: false},
        numberFloor: {display: false, required: false},
    },
    {
        id: 28,
        position: true,
        bedRooms: {display: true, required: false},
        bathRooms: {display: true, required: false},
        numberFloor: {display: true, required: true},
    },
]

export function getForm(formId) {
    const form = listForm.find(item => item.id == formId);
    return form ? form : listForm[0];
}

