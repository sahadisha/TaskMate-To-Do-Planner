$(document).ready(function () {

    // ✅ Format date in local time (YYYY-MM-DD)
    function formatDateLocal(year, month, day) {
        let mm = (month + 1).toString().padStart(2, "0"); // month is 0-based
        let dd = day.toString().padStart(2, "0");
        return `${year}-${mm}-${dd}`;
    }

    // ✅ Get today’s date in local format
    function getToday() {
        let now = new Date();
        return formatDateLocal(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // ✅ Load tasks for a specific date
    function loadTasks(date) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        $(".tdl-content ul").empty();

        tasks.filter(t => t.date === date).forEach((task, index) => {
            $(".tdl-content ul").append(
                `<li>
                    <input type="checkbox" class="check" ${task.done ? "checked" : ""} data-index="${index}">
                    <span class="task">${task.text}</span>
                    <button class="delete" data-index="${index}">X</button>
                </li>`
            );
        });
    }

    // ✅ Save tasks for the selected date
    function saveTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let currentDate = $("#taskDate").val();

        // Remove old tasks for that date
        tasks = tasks.filter(t => t.date !== currentDate);

        // Add updated tasks
        $(".tdl-content ul li").each(function () {
            tasks.push({
                text: $(this).find(".task").text(),
                done: $(this).find(".check").is(":checked"),
                date: currentDate
            });
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // ✅ Add new task
    $(".tdl-new").keypress(function (e) {
        if (e.which === 13 && $(this).val().trim() !== "") {
            let task = $(this).val();
            $(".tdl-content ul").append(
                `<li>
                    <input type="checkbox" class="check">
                    <span class="task">${task}</span>
                    <button class="delete">X</button>
                </li>`
            );
            $(this).val("");
            saveTasks();
        }
    });

    // ✅ Mark as completed
    $(document).on("change", ".check", function () {
        saveTasks();
    });

    // ✅ Delete task
    $(document).on("click", ".delete", function () {
        $(this).parent().remove();
        saveTasks();
    });

    // ✅ Date selector change
    $("#taskDate").on("change", function () {
        loadTasks($(this).val());
    });

    // ✅ Initialize with today’s tasks
    $("#taskDate").val(getToday());
    loadTasks(getToday());

});
