

$(document).ready(function() {
    update_table([]);
    $.ajax({
        url: "/update",
        data: {},
        dataType: 'json',
        type: 'get',
        success: function(response) {
            update_table(response);
        }
    });
});

$("#search-button").on("click", function () {
    var searchInput = $("#search-input").val();
    console.log(searchInput);
    $.ajax({
        url: "/update",
        data: {
            "filter": searchInput
        },
        dataType: 'json',
        type: 'get',
        success: function(response) {
            update_table(response);
            console.log(response);
        }
    });
});


function update_table(ip_tuples) {
    var table = $("#ip-table");
    table.empty();
    table.append(
        "<tr>" +
            "<th>id</th>" +
            "<th>IP address</th>" +
            "<th>MAC address</th>" +
            "<th>timestamp</th>" +
        "</tr>"
    );
    for (var i = ip_tuples.length - 1; i >= 0; i--) {
        var ip_tuple = ip_tuples[i];
        var hostname = ip_tuple[0];
        var ips = ip_tuple[1];
        var ip_entry = "";
        for (var ip_index = 0; ip_index < ips.length; ip_index++) {
            var ip = ips[ip_index];
            ip_entry += ip + "<br>";
        }
        console.log(ip);
        var mac = ip_tuple[2];
        var timestamp = ip_tuple[3];
        table.append(
            "<tr>" +
                "<td>" + hostname + "</td>" +
                "<td>" + ip_entry + "</td>" +
                "<td>" + mac + "</td>" +
                "<td>" + timestamp + "</td>" +
            "</tr>"
        );
    }
}

