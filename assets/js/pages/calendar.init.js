var start_date = document.getElementById("event-start-date"),
    timepicker1 = document.getElementById("timepicker1"),
    timepicker2 = document.getElementById("timepicker2"),
    date_range = null,
    T_check = null;

function flatPickrInit() {
    var e = {
        enableTime: !0,
        noCalendar: !0
    };
    flatpickr(start_date, {
        enableTime: !1,
        mode: "range",
        minDate: "today",
        onChange: function(e, t, n) {
            1 < t.split("to").length ? document.getElementById("event-time").setAttribute("hidden", !0) : (document.getElementById("timepicker1").parentNode.classList.remove("d-none"), document.getElementById("timepicker1").classList.replace("d-none", "d-block"), document.getElementById("timepicker2").parentNode.classList.remove("d-none"), document.getElementById("timepicker2").classList.replace("d-none", "d-block"), document.getElementById("event-time").removeAttribute("hidden"))
        }
    });
    flatpickr(timepicker1, e), flatpickr(timepicker2, e)
}

function flatpicekrValueClear() {
    start_date.flatpickr().clear(), timepicker1.flatpickr().clear(), timepicker2.flatpickr().clear()
}

function eventClicked() {
    document.getElementById("form-event").classList.add("view-event"), document.getElementById("event-title").classList.replace("d-block", "d-none"), document.getElementById("event-category").classList.replace("d-block", "d-none"), document.getElementById("event-start-date").parentNode.classList.add("d-none"), document.getElementById("event-start-date").classList.replace("d-block", "d-none"), document.getElementById("event-time").setAttribute("hidden", !0), document.getElementById("timepicker1").parentNode.classList.add("d-none"), document.getElementById("timepicker1").classList.replace("d-block", "d-none"), document.getElementById("timepicker2").parentNode.classList.add("d-none"), document.getElementById("timepicker2").classList.replace("d-block", "d-none"), document.getElementById("event-location").classList.replace("d-block", "d-none"), document.getElementById("event-description").classList.replace("d-block", "d-none"), document.getElementById("event-start-date-tag").classList.replace("d-none", "d-block"), document.getElementById("event-timepicker1-tag").classList.replace("d-none", "d-block"), document.getElementById("event-timepicker2-tag").classList.replace("d-none", "d-block"), document.getElementById("event-location-tag").classList.replace("d-none", "d-block"), document.getElementById("event-description-tag").classList.replace("d-none", "d-block"), document.getElementById("btn-save-event").setAttribute("hidden", !0)
}

function editEvent(e) {
    var t = e.getAttribute("data-id");
    ("new-event" == t ? (document.getElementById("modal-title").innerHTML = "", document.getElementById("modal-title").innerHTML = "Add Event", document.getElementById("btn-save-event").innerHTML = "Add Event", eventTyped) : "edit-event" == t ? (e.innerHTML = "Cancel", e.setAttribute("data-id", "cancel-event"), document.getElementById("btn-save-event").innerHTML = "Update Event", e.removeAttribute("hidden"), eventTyped) : (e.innerHTML = "Edit", e.setAttribute("data-id", "edit-event"), eventClicked))()
}

function eventTyped() {
    document.getElementById("form-event").classList.remove("view-event"), document.getElementById("event-title").classList.replace("d-none", "d-block"), document.getElementById("event-category").classList.replace("d-none", "d-block"), document.getElementById("event-start-date").parentNode.classList.remove("d-none"), document.getElementById("event-start-date").classList.replace("d-none", "d-block"), document.getElementById("timepicker1").parentNode.classList.remove("d-none"), document.getElementById("timepicker1").classList.replace("d-none", "d-block"), document.getElementById("timepicker2").parentNode.classList.remove("d-none"), document.getElementById("timepicker2").classList.replace("d-none", "d-block"), document.getElementById("event-location").classList.replace("d-none", "d-block"), document.getElementById("event-description").classList.replace("d-none", "d-block"), document.getElementById("event-start-date-tag").classList.replace("d-block", "d-none"), document.getElementById("event-timepicker1-tag").classList.replace("d-block", "d-none"), document.getElementById("event-timepicker2-tag").classList.replace("d-block", "d-none"), document.getElementById("event-location-tag").classList.replace("d-block", "d-none"), document.getElementById("event-description-tag").classList.replace("d-block", "d-none"), document.getElementById("btn-save-event").removeAttribute("hidden")
}

function upcomingEvent(e) {
    e.sort(function(e, t) {
        return new Date(e.start) - new Date(t.start)
    }), document.getElementById("upcoming-event-list").innerHTML = null, Array.from(e).forEach(function(e) {
        var t = e.title,
            n = (l = e.end ? (endUpdatedDay = new Date(e.end)).setDate(endUpdatedDay.getDate() - 1) : l) || void 0;
        n = "Invalid Date" == n || null == n ? null : (a = new Date(n).toLocaleDateString("en", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        }), new Date(a).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).split(" ").join(" "));
        (e.start ? str_dt(e.start) : null) === (l ? str_dt(l) : null) && (n = null);
        var a = e.start,
            d = (a = "Invalid Date" === a || void 0 === a ? null : (d = new Date(a).toLocaleDateString("en", {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            }), new Date(d).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
            }).split(" ").join(" ")), n ? " to " + n : ""),
            n = e.className.split("-"),
            i = e.description || "",
            e = tConvert(getTime(e.start)),
            l = (e == (l = tConvert(getTime(l))) && (e = "Full day event", l = null), l ? " to " + l : "");
        u_event = "<div class='card mb-3'>                        <div class='card-body'>                            <div class='d-flex mb-3'>                                <div class='flex-grow-1'><i class='mdi mdi-checkbox-blank-circle me-2 text-" + n[2] + "'></i><span class='fw-medium'>" + a + d + " </span></div>                                <div class='flex-shrink-0'><small class='badge badge-soft-primary ms-auto'>" + e + l + "</small></div>                            </div>                            <h6 class='card-title fs-16'> " + t + "</h6>                            <p class='text-muted text-truncate-two-lines mb-0'> " + i + "</p>                        </div>                    </div>", document.getElementById("upcoming-event-list").innerHTML += u_event
    })
}

function getTime(e) {
    if (null != (e = new Date(e)).getHours()) return e.getHours() + ":" + (e.getMinutes() ? e.getMinutes() : 0)
}

function tConvert(e) {
    var e = e.split(":"),
        t = e[0],
        e = e[1],
        n = 12 <= t ? "PM" : "AM";
    return (t = (t %= 12) || 12) + ":" + (e < 10 ? "0" + e : e) + " " + n
}
document.addEventListener("DOMContentLoaded", function() {
    flatPickrInit();
    var g = new bootstrap.Modal(document.getElementById("event-modal"), {
        keyboard: !1
    }),
    d = (document.getElementById("event-modal"), document.getElementById("modal-title")),
    i = document.getElementById("form-event"),
    v = null,
    p = document.getElementsByClassName("needs-validation"),
    e = new Date,
    t = e.getDate(),
    n = e.getMonth(),
    e = e.getFullYear(),
    a = FullCalendar.Draggable,
    l = document.getElementById("external-events"),
    y = [
        // Front-End Developer Tasks with Subtasks
        {
            id: 1,
            title: "Requirement Analysis and Planning",
            start: new Date(e, n, 1),
            end: new Date(e, n, 7),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 2,
            title: "Gather Requirements",
            start: new Date(e, n, 1),
            end: new Date(e, n, 4),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 3,
            title: "Planning & Documentation",
            start: new Date(e, n, 4),
            end: new Date(e, n, 7),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 2,
            title: "Login & Registration Development",
            start: new Date(e, n, 1),
            end: new Date(e, n, 7),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 2.1,
            title: "Design Login Flow",
            start: new Date(e, n, 1),
            end: new Date(e, n, 4),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 2.2,
            title: "Develop Registration Module",
            start: new Date(e, n, 4),
            end: new Date(e, n, 7),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 3,
            title: "Dashboard Development",
            start: new Date(e, n, 7),
            end: new Date(e, n, 12),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 3.1,
            title: "Design Dashboard Layout",
            start: new Date(e, n, 7),
            end: new Date(e, n, 9),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 3.2,
            title: "Implement Widgets",
            start: new Date(e, n, 9),
            end: new Date(e, n, 12),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 4,
            title: "User Authentication Module",
            start: new Date(e, n, 7),
            end: new Date(e, n, 12),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 4.1,
            title: "Implement OAuth2",
            start: new Date(e, n, 7),
            end: new Date(e, n, 9),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 4.2,
            title: "Set Up JWT Tokens",
            start: new Date(e, n, 9),
            end: new Date(e, n, 12),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 5,
            title: "Settings & Notifications",
            start: new Date(e, n, 12),
            end: new Date(e, n, 17),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 5.1,
            title: "Build Settings Page",
            start: new Date(e, n, 12),
            end: new Date(e, n, 14),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 5.2,
            title: "Integrate Notification System",
            start: new Date(e, n, 14),
            end: new Date(e, n, 17),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 6,
            title: "Dashboard Development",
            start: new Date(e, n, 12),
            end: new Date(e, n, 17),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 6.1,
            title: "Build Backend API for Dashboard",
            start: new Date(e, n, 12),
            end: new Date(e, n, 14),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 6.2,
            title: "Connect Front-End with API",
            start: new Date(e, n, 14),
            end: new Date(e, n, 17),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 7,
            title: "Performance Optimization",
            start: new Date(e, n, 17),
            end: new Date(e, n, 22),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 7.1,
            title: "Optimize Codebase",
            start: new Date(e, n, 17),
            end: new Date(e, n, 20),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 7.2,
            title: "Run Performance Tests",
            start: new Date(e, n, 20),
            end: new Date(e, n, 22),  // Added 1 extra day
            className: "bg-soft-success",
            allDay: true,
            extendedProps: {
                department: "Front-End Developer"
            }
        },
        {
            id: 8,
            title: "Notifications Development",
            start: new Date(e, n, 17),
            end: new Date(e, n, 22),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 8.1,
            title: "Develop Notification API",
            start: new Date(e, n, 17),
            end: new Date(e, n, 20),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        },
        {
            id: 8.2,
            title: "Integrate Notifications with UI",
            start: new Date(e, n, 20),
            end: new Date(e, n, 22),  // Added 1 extra day
            className: "bg-soft-info",
            allDay: true,
            extendedProps: {
                department: "App Developer"
            }
        }
    ],
    e = (new a(l, {
        itemSelector: ".external-event",
        eventData: function(e) {
            return {
                id: Math.floor(11e3 * Math.random()),
                title: e.innerText,
                allDay: !0,
                start: new Date,
                className: e.getAttribute("data-class")
            }
        }
    }), document.getElementById("calendar"));




    function o(e) {
        document.getElementById("form-event").reset(), document.getElementById("btn-delete-event").setAttribute("hidden", !0), g.show(), i.classList.remove("was-validated"), i.reset(), v = null, d.innerText = "Add Event", newEventData = e, document.getElementById("edit-event-btn").setAttribute("data-id", "new-event"), document.getElementById("edit-event-btn").click(), document.getElementById("edit-event-btn").setAttribute("hidden", !0)
    }

    function r() {
        return 768 <= window.innerWidth && window.innerWidth < 1200 ? "timeGridWeek" : window.innerWidth <= 768 ? "listMonth" : "dayGridMonth"
    }
    var c = new Choices("#event-category", {
            searchEnabled: !1
        }),
        E = new FullCalendar.Calendar(e, {
            timeZone: "local",
            editable: !0,
            droppable: !0,
            selectable: !0,
            navLinks: !0,
            initialView: r(),
            themeSystem: "bootstrap",
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            },
            windowResize: function(e) {
                var t = r();
                E.changeView(t)
            },
            eventResize: function(t) {
                var e = y.findIndex(function(e) {
                    return e.id == t.event.id
                });
                y[e] && (y[e].title = t.event.title, y[e].start = t.event.start, y[e].end = t.event.end || null, y[e].allDay = t.event.allDay, y[e].className = t.event.classNames[0], y[e].description = t.event._def.extendedProps.description || "", y[e].location = t.event._def.extendedProps.location || ""), upcomingEvent(y)
            },
            eventClick: function(e) {
                document.getElementById("edit-event-btn").removeAttribute("hidden"), document.getElementById("btn-save-event").setAttribute("hidden", !0), document.getElementById("edit-event-btn").setAttribute("data-id", "edit-event"), document.getElementById("edit-event-btn").innerHTML = "Edit", eventClicked(), flatPickrInit(), flatpicekrValueClear(), g.show(), i.reset(), v = e.event, document.getElementById("modal-title").innerHTML = "", document.getElementById("event-location-tag").innerHTML = void 0 === v.extendedProps.location ? "No Location" : v.extendedProps.location, document.getElementById("event-description-tag").innerHTML = void 0 === v.extendedProps.description ? "No Description" : v.extendedProps.description, document.getElementById("event-title").value = v.title, document.getElementById("event-location").value = void 0 === v.extendedProps.location ? "No Location" : v.extendedProps.location, document.getElementById("event-description").value = void 0 === v.extendedProps.description ? "No Description" : v.extendedProps.description, document.getElementById("eventid").value = v.id, v.classNames[0] && (c.destroy(), (c = new Choices("#event-category", {
                    searchEnabled: !1
                })).setChoiceByValue(v.classNames[0]));

                function t(e) {
                    var t = "" + ((e = new Date(e)).getMonth() + 1),
                        n = "" + e.getDate();
                    return [e.getFullYear(), t = t.length < 2 ? "0" + t : t, n = n.length < 2 ? "0" + n : n].join("-")
                }
                var e = v.start,
                    n = v.end,
                    a = null == n ? str_dt(e) : str_dt(e) + " to " + str_dt(n),
                    e = null == n ? t(e) : t(e) + " to " + t(n),
                    n = (flatpickr(start_date, {
                        defaultDate: e,
                        altInput: !0,
                        altFormat: "j F Y",
                        dateFormat: "Y-m-d",
                        mode: "range",
                        onChange: function(e, t, n) {
                            1 < t.split("to").length ? document.getElementById("event-time").setAttribute("hidden", !0) : (document.getElementById("timepicker1").parentNode.classList.remove("d-none"), document.getElementById("timepicker1").classList.replace("d-none", "d-block"), document.getElementById("timepicker2").parentNode.classList.remove("d-none"), document.getElementById("timepicker2").classList.replace("d-none", "d-block"), document.getElementById("event-time").removeAttribute("hidden"))
                        }
                    }), document.getElementById("event-start-date-tag").innerHTML = a, getTime(v.start)),
                    e = getTime(v.end);
                n == e ? (document.getElementById("event-time").setAttribute("hidden", !0), flatpickr(document.getElementById("timepicker1"), {
                    enableTime: !0,
                    noCalendar: !0,
                    dateFormat: "H:i"
                }), flatpickr(document.getElementById("timepicker2"), {
                    enableTime: !0,
                    noCalendar: !0,
                    dateFormat: "H:i"
                })) : (document.getElementById("event-time").removeAttribute("hidden"), flatpickr(document.getElementById("timepicker1"), {
                    enableTime: !0,
                    noCalendar: !0,
                    dateFormat: "H:i",
                    defaultDate: n
                }), flatpickr(document.getElementById("timepicker2"), {
                    enableTime: !0,
                    noCalendar: !0,
                    dateFormat: "H:i",
                    defaultDate: e
                }), document.getElementById("event-timepicker1-tag").innerHTML = tConvert(n), document.getElementById("event-timepicker2-tag").innerHTML = tConvert(e)), newEventData = null, d.innerText = v.title, document.getElementById("btn-delete-event").removeAttribute("hidden")
            },
            dateClick: function(e) {
                o(e)
            },
            events: y,
            eventReceive: function(e) {
                e = {
                    id: parseInt(e.event.id),
                    title: e.event.title,
                    start: e.event.start,
                    allDay: e.event.allDay,
                    className: e.event.classNames[0]
                };
                y.push(e), upcomingEvent(y)
            },
            eventDrop: function(t) {
                var e = y.findIndex(function(e) {
                    return e.id == t.event.id
                });
                y[e] && (y[e].title = t.event.title, y[e].start = t.event.start, y[e].end = t.event.end || null, y[e].allDay = t.event.allDay, y[e].className = t.event.classNames[0], y[e].description = t.event._def.extendedProps.description || "", y[e].location = t.event._def.extendedProps.location || ""), upcomingEvent(y)
            }
        });
    E.render(), upcomingEvent(y), i.addEventListener("submit", function(e) {
        e.preventDefault();
        var t, n, e = document.getElementById("event-title").value,
            a = document.getElementById("event-category").value,
            d = document.getElementById("event-start-date").value.split("to"),
            i = new Date(d[0].trim()),
            l = d[1] ? new Date(d[1].trim()) : "",
            o = null,
            r = document.getElementById("event-location").value,
            c = document.getElementById("event-description").value,
            s = document.getElementById("eventid").value,
            m = !1,
            u = (1 < d.length ? ((o = new Date(d[1])).setDate(o.getDate() + 1), d = new Date(d[0]), m = !0) : (t = d, u = document.getElementById("timepicker1").value.trim(), n = document.getElementById("timepicker2").value.trim(), d = new Date(d + "T" + u), o = new Date(t + "T" + n)), y.length + 1);
        !1 === p[0].checkValidity() ? p[0].classList.add("was-validated") : (v ? (v.setProp("id", s), v.setProp("title", e), v.setProp("classNames", [a]), v.setStart(i), v.setEnd(l), v.setAllDay(m), v.setExtendedProp("description", c), v.setExtendedProp("location", r), t = y.findIndex(function(e) {
            return e.id == v.id
        }), y[t] && (y[t].title = e, y[t].start = i, y[t].end = l, y[t].allDay = m, y[t].className = a, y[t].description = c, y[t].location = r), E.render()) : (E.addEvent(n = {
            id: u,
            title: e,
            start: d,
            end: o,
            allDay: m,
            className: a,
            description: c,
            location: r
        }), y.push(n)), g.hide(), upcomingEvent(y))
    }), document.getElementById("btn-delete-event").addEventListener("click", function(e) {
        if (v) {
            for (var t = 0; t < y.length; t++) y[t].id == v.id && (y.splice(t, 1), t--);
            upcomingEvent(y), v.remove(), v = null, g.hide()
        }
    }), document.getElementById("btn-new-event").addEventListener("click", function(e) {
        flatpicekrValueClear(), flatPickrInit(), o(), document.getElementById("edit-event-btn").setAttribute("data-id", "new-event"), document.getElementById("edit-event-btn").click(), document.getElementById("edit-event-btn").setAttribute("hidden", !0)
    })
});
var str_dt = function(e) {
    var e = new Date(e),
        t = "" + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][e.getMonth()],
        n = "" + e.getDate(),
        e = e.getFullYear();
    return t.length < 2 && (t = "0" + t), [(n = n.length < 2 ? "0" + n : n) + " " + t, e].join(",")
};