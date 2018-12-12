const demoEvents = [
    {
        title: "Abs Circuit",
        description:
            "Abs Circuit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, unde, nulla. Vel unde deleniti, distinctio inventore quis molestiae perferendis, eum quo harum dolorum reiciendis sunt dicta maiores similique! Officiis repellat iure odio debitis enim eius commodi quae deserunt quam assumenda, ab asperiores reiciendis minima maxime odit laborum, libero veniam non?",
        // event's color, decimal value of hex color number
        color: {
            type: Number,
            required: true
        },
        // event's start time
        startAt: {
            // store as a number of minutes,
            // value range [0, 1440], 1440 = 24 hour * 60 minute
            // startTime must be less than endTime
            type: Number,
            min: 0,
            max: 1440,
            required: true
        },
        // event's end time
        endAt: {
            // store as a number of minutes,
            // value range [0, 1440], 1440 = 24 hour * 60 minute
            // endTime must be larger than startTime
            type: Number,
            min: 0,
            max: 1440,
            required: true
        },
        // event's day of week
        weekday: {
            // range [0,4], Monday to Friday
            type: Number,
            min: 0,
            max: 4,
            required: true
        }
    }
];

export default demoEvents;
