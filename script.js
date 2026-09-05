const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen ? "✕" : "☰";

    });


    // mobile_menu_close_click_link

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML = "☰";

        });

    });

}

//  event_data 

const events = [

    // event_1
    
    {
        id: 1,

        title: "Grand Music Concert 2026",

        category: "Concert",

        type: "In-Person",

        image: "images/concert.jpg",

        price: "PKR 3,500",

        date: "15 Oct 2026",

        month: "October",

        time: "7:00 PM",

        location: "Lahore Expo Center",

        description:
            "Enjoy an unforgettable evening filled with live music, amazing performances and a vibrant atmosphere.",

        organizer:
            "Aimora Events Team",

        venueDetails:
            "Lahore Expo Center, Johar Town, Lahore",

        schedule: [
            "07:00 PM — Doors Open",
            "07:30 PM — Opening Performance",
            "08:00 PM — Main Concert",
            "10:00 PM — Event Ends"
        ]
    },

// event_2

    {
        id: 2,

        title: "Tech Innovation Summit",

        category: "Seminar",

        type: "Hybrid",

        image: "images/seminar.jpg",

        price: "PKR 5,000",

        date: "20 Oct 2026",

        month: "October",

        time: "10:00 AM",

        location: "Marriott, Islamabad",

        description:
            "Join technology professionals and innovators to explore the latest trends, ideas and opportunities in the digital world.",

        organizer:
            "Aimora Events Team",

        venueDetails:
            "Marriott Hotel, Islamabad",

        schedule: [
            "10:00 AM — Registration",
            "10:30 AM — Opening Session",
            "12:00 PM — Technology Keynote",
            "02:00 PM — Networking Session",
            "04:00 PM — Closing Session"
        ]
    },

// event_3

    {
        id: 3,

        title: "UI/UX Design Masterclass",

        category: "Workshop",

        type: "Online",

        image: "images/workshop.jpg",

        price: "PKR 2,500",

        date: "28 Oct 2026",

        month: "October",

        time: "2:00 PM",

       location: "Online — Zoom",

        description:
            "Learn practical UI/UX design techniques, user research, wireframing and modern design principles from experienced designers.",

        organizer:
            "Aimora Design Academy",

       venueDetails: 
       "Online event. Joining details will be sent to registered participants.",


        schedule: [
            "02:00 PM — Registration",
            "02:30 PM — Design Fundamentals",
            "03:30 PM — UI/UX Practical Session",
            "05:00 PM — Design Challenge",
            "06:00 PM — Q&A Session"
        ]
    },

// event_4

    {
        id: 4,

        title: "Cultural Food Festival",

        category: "Festival",

        type: "In-Person",

        image: "images/festival.jpg",

        price: "Free",

        date: "05 Nov 2026",

        month: "November",

        time: "5:00 PM",

        location: "Alhamra Open Air Theatre, Lahore",

        description:
            "Experience delicious food, cultural performances, traditional activities and entertainment for the whole family.",

        organizer:
            "Aimora Events Team",

        venueDetails:
            "Alhamra Open Air Theatre, Lahore",

        schedule: [
            "05:00 PM — Festival Opens",
            "05:30 PM — Food Stalls Open",
            "07:00 PM — Cultural Performance",
            "08:30 PM — Live Entertainment",
            "10:00 PM — Festival Ends"
        ]
    }

];


//  get_element 

const eventGrid =
    document.getElementById("eventGrid");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const dateFilter =
    document.getElementById("dateFilter");

const typeFilter =
    document.getElementById("typeFilter");

const eventModal =
    document.getElementById("eventModal");

const modalBody =
    document.getElementById("modalBody");

const modalClose =
    document.getElementById("modalClose");


//  display_events 

function displayEvents(filteredEvents) {

    if (!eventGrid) {
        return;
    }

    eventGrid.innerHTML = "";


    /* no_events */

    if (filteredEvents.length === 0) {

        eventGrid.innerHTML = `

            <div class="no-events">

                <i class="fa-regular fa-calendar-xmark"></i>

                <h4>No Events Found</h4>

                <p>
                    Try another event name, category or date.
                </p>

            </div>

        `;

        return;
    }


    /* event_cards */

    filteredEvents.forEach(function (event) {

        const eventCard = `

            <div class="event-card">

                <div class="event-image-wrapper">

                    <img
                        src="${event.image}"
                        alt="${event.title}"
                        class="event-image"
                    >

                    <span class="event-date-badge">

                        <i class="fa-regular fa-calendar"></i>

                        ${event.date}

                    </span>

                </div>


                <div class="event-content">

                    <span class="event-category">
                        ${event.category}
                    </span>


                    <h3>
                        ${event.title}
                    </h3>


                    <p class="event-info">

                        <i class="fa-regular fa-clock"></i>

                        <span>
                            ${event.time}
                        </span>

                    </p>


                    <p class="event-info">

                        <i class="fa-solid fa-location-dot"></i>

                        <span>
                            ${event.location}
                        </span>

                    </p>


                    <div class="event-bottom">

                        <div class="event-price">
                            ${event.price}
                        </div>


                        <button
                            type="button"
                            class="event-book-btn"
                            data-event-id="${event.id}"
                        >

                            View Details

                            <i class="fa-solid fa-arrow-right"></i>

                        </button>

                    </div>

                </div>

            </div>

        `;


        eventGrid.insertAdjacentHTML(
            "beforeend",
            eventCard
        );

    });


    /* add_buttons_event */

    const buttons =
        eventGrid.querySelectorAll(".event-book-btn");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const eventId =
                Number(button.dataset.eventId);

            openEventModal(eventId);

        });

    });

}


//  search_filter 

function filterEvents() {

    const searchValue =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "All";


    const selectedDate =
        dateFilter
            ? dateFilter.value
            : "All";

const selectedType =
    typeFilter
        ? typeFilter.value
        : "All";


    const filteredEvents =
        events.filter(function (event) {


            //  search 

            const matchesSearch =
                event.title
                    .toLowerCase()
                    .includes(searchValue);


            // category 

            const matchesCategory =
                selectedCategory === "All" ||
                event.category === selectedCategory;


            // date 

            const matchesDate =
                selectedDate === "All" ||
                event.month === selectedDate;

          //  type

           const matchesType =
                 selectedType === "All" ||
                 event.type === selectedType;


           return (
    matchesSearch &&
    matchesCategory &&
    matchesDate &&
    matchesType
);


        });


    displayEvents(filteredEvents);

}


// search_input 

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterEvents
    );

}


//  category_filter  

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterEvents
    );

}


//  date_filter 

if (dateFilter) {

    dateFilter.addEventListener(
        "change",
        filterEvents
    );

}

// type_filter

if (typeFilter) {

    typeFilter.addEventListener(
        "change",
        filterEvents
    );

}


//  open_event_model 

function openEventModal(eventId) {

    const event =
        events.find(function (item) {

            return item.id === eventId;

        });


    if (!event || !modalBody || !eventModal) {
        return;
    }


    modalBody.innerHTML = `

        <div class="booking-event">


            <!-- EVENT IMAGE -->

            <div class="booking-image-wrapper">

                <img
                    src="${event.image}"
                    alt="${event.title}"
                    class="booking-image"
                >

            </div>


            <!-- category -->

            <span class="event-category">
                ${event.category}
            </span>


            <!-- TITLE -->

            <h3 class="booking-title">
                ${event.title}
            </h3>


            <!-- basic_details -->

            <div class="booking-details">

                <div>

                    <i class="fa-regular fa-calendar"></i>

                    <span>
                        ${event.date}
                    </span>

                </div>


                <div>

                    <i class="fa-regular fa-clock"></i>

                    <span>
                        ${event.time}
                    </span>

                </div>


                <div>

                    <i class="fa-solid fa-location-dot"></i>

                    <span>
                        ${event.location}
                    </span>

                </div>

            </div>


            <!-- DESCRIPTION -->

            <p class="booking-description">
                ${event.description}
            </p>


            <!-- VENUE -->

            <div class="event-extra-info">

                <h5 class="booking-heading">

                    <i class="fa-solid fa-building"></i>

                    Venue Details

                </h5>

                <p>
                    ${event.venueDetails}
                </p>

            </div>


            <!-- ORGANIZER -->

            <div class="event-extra-info">

                <h5 class="booking-heading">

                    <i class="fa-solid fa-user-tie"></i>

                    Organizer

                </h5>

                <p>
                    ${event.organizer}
                </p>

            </div>


            <!-- SCHEDULE -->

            <div class="event-extra-info">

                <h5 class="booking-heading">

                    <i class="fa-solid fa-list-check"></i>

                    Event Schedule

                </h5>


                <div class="event-schedule">

                    ${event.schedule.map(function (item) {

                        return `

                            <div class="schedule-item">

                                <i class="fa-solid fa-circle-check"></i>

                                <span>
                                    ${item}
                                </span>

                            </div>

                        `;

                    }).join("")}

                </div>

            </div>


            <!-- PRICE -->

            <div class="booking-price">

                <span>
                    Ticket Price
                </span>

                <strong>
                    ${event.price}
                </strong>

            </div>


            <div class="booking-divider"></div>


            <!-- BOOKING -->

            <h5 class="booking-heading">

                <i class="fa-solid fa-ticket"></i>

                Book Your Tickets

            </h5>


            <form id="bookingForm">


                <!-- NAME -->

                <div class="form-group">

                    <label
                        for="userName"
                        class="form-label"
                    >
                        Full Name
                    </label>


                    <input
                        type="text"
                        id="userName"
                        class="form-control"
                        placeholder="Enter your full name"
                        minlength="3"
                        required
                    >

                </div>


                <!-- EMAIL -->

                <div class="form-group">

                    <label
                        for="userEmail"
                        class="form-label"
                    >
                        Email Address
                    </label>


                    <input
                        type="email"
                        id="userEmail"
                        class="form-control"
                        placeholder="Enter your email address"
                        required
                    >

                </div>


                <!-- PHONE -->

                <div class="form-group">

                    <label
                        for="userPhone"
                        class="form-label"
                    >
                        Phone Number
                    </label>


                    <input
                        type="tel"
                        id="userPhone"
                        class="form-control"
                        placeholder="03XX XXXXXXX"
                        required
                    >

                </div>


                <!-- TICKETS -->

                <div class="form-group">

                    <label
                        for="ticketCount"
                        class="form-label"
                    >
                        Number of Tickets
                    </label>


                    <input
                        type="number"
                        id="ticketCount"
                        class="form-control"
                        min="1"
                        max="10"
                        value="1"
                        required
                    >

                </div>


                <!-- ALERT -->

                <div id="bookingAlert"></div>


                <!-- SUBMIT -->

                <button
                    type="submit"
                    class="booking-submit"
                >

                    Confirm Booking

                    <i class="fa-solid fa-check"></i>

                </button>


            </form>


        </div>

    `;


    //  show_custom_modal 

    eventModal.classList.add("active");

    eventModal.setAttribute(
        "aria-hidden",
        "false"
    );


    //  prevent_body_scroll 

    document.body.style.overflow = "hidden";


    /* booking_form */

    const bookingForm =
        document.getElementById("bookingForm");


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (e) {

                handleBooking(
                    e,
                    event
                );

            }
        );

    }

}


// close_model 

function closeEventModal() {

    if (!eventModal) {
        return;
    }


    eventModal.classList.remove("active");

    eventModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow = "";


    if (modalBody) {
        modalBody.innerHTML = "";
    }

}

// close_button

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeEventModal
    );

}

// close_evemt_model

if (eventModal) {

    eventModal.addEventListener(
        "click",
        function (e) {

            if (e.target === eventModal) {

                closeEventModal();

            }

        }
    );

}

// escape_key

document.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key === "Escape" &&
            eventModal &&
            eventModal.classList.contains("active")
        ) {

            closeEventModal();

        }

    }
);

// booking_vildation

function handleBooking(e, event) {

    e.preventDefault();


    const nameInput =
        document.getElementById("userName");


    const emailInput =
        document.getElementById("userEmail");


    const phoneInput =
        document.getElementById("userPhone");


    const ticketInput =
        document.getElementById("ticketCount");


    const alertBox =
        document.getElementById("bookingAlert");


    if (
        !nameInput ||
        !emailInput ||
        !phoneInput ||
        !ticketInput ||
        !alertBox
    ) {

        return;

    }


    const name =
        nameInput.value.trim();


    const email =
        emailInput.value.trim();


    const phone =
        phoneInput.value.trim();


    const tickets =
        Number(ticketInput.value);


    /* NAME VALIDATION */

    if (name.length < 3) {

        alertBox.innerHTML = `

            <div class="booking-error">

                <i class="fa-solid fa-circle-exclamation"></i>

                Please enter a valid name.

            </div>

        `;

        nameInput.focus();

        return;

    }


    /* EMAIL VALIDATION */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alertBox.innerHTML = `

            <div class="booking-error">

                <i class="fa-solid fa-circle-exclamation"></i>

                Please enter a valid email address.

            </div>

        `;

        emailInput.focus();

        return;

    }


    /* phone_vildation */

        const phonePattern =
    /^(03[0-9]{9}|\+923[0-9]{9})$/;



    const cleanPhone =
        phone.replace(/[\s-]/g, "");

        


    if (!phonePattern.test(cleanPhone)) {

        alertBox.innerHTML = `

            <div class="booking-error">

                <i class="fa-solid fa-circle-exclamation"></i>

                Please enter a valid Pakistani phone number.

            </div>

        `;

        phoneInput.focus();

        return;

    }


    /* ticket_vildation  */

    if (
        !Number.isInteger(tickets) ||
        tickets < 1 ||
        tickets > 10
    ) {

        alertBox.innerHTML = `

            <div class="booking-error">

                <i class="fa-solid fa-circle-exclamation"></i>

                Please select between 1 and 10 tickets.

            </div>

        `;

        ticketInput.focus();

        return;

    }


    /* SUCCESS */

    alertBox.innerHTML = `

        <div class="booking-success">

            <i class="fa-solid fa-circle-check"></i>

            <div>

                <strong>
                    Booking Confirmed!
                </strong>

                <p>

                    Thank you ${name}!

                    Your ${tickets}
                    ticket${tickets > 1 ? "s" : ""}
                    for

                    <strong>
                        ${event.title}
                    </strong>

                    have been reserved successfully.

                </p>

            </div>

        </div>

    `;


    /* Reset form after successful booking */

    document
        .getElementById("bookingForm")
        .reset();


    /* Keep success message visible */

}


//  event_display  

displayEvents(events);
