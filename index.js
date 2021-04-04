$(document).ready(function() {
    consumeEventTrigger();
    storeEventTrigger();
    cleanEventTrigger();
    $('#btnPull').click();
});

function cleanEventTrigger() {
    $('#btnClean').click(function() {
        var api_url = "http://localhost:8080/clean";
        
        var id = null;
        var ids = null;

        var authorId = $('#authorId').val();
        if (authorId !== '') {
            if (authorId.split(',').length > 1) {
                ids = authorId;
            } else {
                id = authorId;
            }
        }

        $.ajax({
            url: api_url,
            type: 'DELETE',
            data: {id, ids},
            success: function(result) {
                alert('Data success clean from database.');
            },
            error: function(result) {
                alert('No data found.');
                $('#flickrTable').find('tbody tr').remove();
            }
        })
    });
}

function storeEventTrigger() {
    $('#btnStore').click(function() {
        var api_url = "http://localhost:8080/searchAndstore";
        
        var id = null;
        var ids = null;
        var tags = null;

        var authorId = $('#authorId').val();
        if (authorId !== '') {
            if (authorId.split(',').length > 1) {
                ids = authorId;
            } else {
                id = authorId;
            }
        }

        var tag = $('#tags').val();
        if (tag !== '') {
            tags = tag;
        }

        $.ajax({
            url: api_url,
            type: 'GET',
            data: {id, ids, tags},
            success: function(result) {
                displayResultInTableRow(result);
                alert('Data success stored base on the pulled data.');
            },
            error: function(result) {
                alert('No data found.');
                $('#flickrTable').find('tbody tr').remove();
            }
        })
    });
}

function consumeEventTrigger() {
    $('#btnPull').click(function() {
        var api_url = "http://localhost:8080/search";
        
        var id = null;
        var ids = null;
        var tags = null;

        var authorId = $('#authorId').val();
        if (authorId !== '') {
            if (authorId.split(',').length > 1) {
                ids = authorId;
            } else {
                id = authorId;
            }
        }

        var tag = $('#tags').val();
        if (tag !== '') {
            tags = tag;
        }

        $.ajax({
            url: api_url,
            type: 'GET',
            data: {id, ids, tags},
            success: function(result) {
                displayResultInTableRow(result);
            },
            error: function(result) {
                alert('No data found.');
                $('#flickrTable').find('tbody tr').remove();
            }
        })
    });
}

function setParam(iId, iIds, iTags) {
    
    
    if(authorId !== '' || tags !== '') {

        if (authorId !== '') {
            if (authorId.split(',').length > 1) {
                iIds = authorId;
            } else {
                iId = authorId;
            }
        }

        
    }
}

function displayResultInTableRow(flickr) {
    var table = $('#flickrTable');

    table.find('tbody tr').remove();

    if (typeof flickr._embedded !== 'undefined') {
        var items = flickr._embedded.itemsList;

        for (var i = 0; i < items.length; i++) {
            var row = "<tr>";
            row += "<td>"+ items[i].title +"</td>";
            row += "<td><a href='"+ items[i].link +"'>Visit</a></td>";
            row += "<td>"+ items[i].description +"</td>";
            row += "<td>"+ items[i].published +"</td>";
            row += "<td>"+ items[i].author +"</td>";
            row += "<td>"+ items[i].tags +"</td>";
            row += "<td><a href='"+ items[i].media.m +"'>Media</a></td>";
            row += "<td>"+ items[i].date_taken +"</td>";
            row += "<td>"+ items[i].author_id +"</td>";
            row += "</tr>";
            table.find('tbody').append(row);
        }
    }   
}