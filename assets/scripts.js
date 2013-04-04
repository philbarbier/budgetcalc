
var expenses;
var periods;
var inbounds;

var inbound_amounts = [];

var summaries = [];
var remainders = [];

var remainder_amount = 0.00;

// setup the page on load

$(document).ready(function() {

    $('.dropdown-toggle').dropdown();

    expenses = getExpenses();
    periods  = getPeriods();
    inbounds  = getInbound();

    $('#period_colour_list ul li div').click(function(e) {
        $('#period_colour_choice').val($(this).attr('data-value'));
    });

    $('.colour_choice').click(function(e) {
    });

    $('#add_period').click(function(e) {
        addPeriod();
    });

    $('#add_expense').click(function(e) {
        addExpense();
    });

    $('#add_inbound').click(function(e) {
        addInbound();
    });

    
    setTimeout(
        function() {
            refreshItems();
            $('.expense_colour').click(function(e) {
                $('#expense_colour_choice').val($(this).attr('data-value'));
            });
            $('.inbound_colour').click(function(e) {
                $('#inbound_colour_choice').val($(this).attr('data-value'));
            });

            $('.expense .del_expense').click(function(e) {
                delExpense($(this).parent().parent('.expense').attr('data-id'));
            });

        },500);

});

// refreshes items loaded from ajax

function refreshItems() {
    for (i in periods) {
        var html = '<div data-value="' + periods[i].colour + '" class="left span6 period_row">';
        html += '<div class="left period_colour span3 ' + periods[i].colour + '"></div>';
        html += '<div class="left period_title span2">' + periods[i].title + '</div>';
        html += '</div>';

        $('#periods').append(html);
        
        var html = '<li class="span3"><div class="expense_colour left span1 ' + periods[i].colour + '" data-value="' + periods[i].colour + '"></div><div class="left span2">' + periods[i].title + '</div></li>';
        $('#expense_allocation ul').append(html);

        var html = '<li class="span3"><div class="inbound_colour left span1 ' + periods[i].colour + '" data-value="' + periods[i].colour + '"></div><div class="left span2">' + periods[i].title + '</div></li>';
        $('#inbound_allocation ul').append(html);

        summaries[periods[i].colour] = '';
        remainders[periods[i].colour] = '';

    }
    console.log(expenses);
    for (i in expenses) {
        var html = '<div class="expense" id="expense_' + expenses[i]._id['$id'] + '" data-id="' + expenses[i]._id['$id'] + '" data-value="' + expenses[i].colour + '">';
        html += '<div class="left expense_title span2">' + expenses[i].title + '</div>';
        html += '<div class="left expense_allocation span2 ' + expenses[i].colour + '"></div>';
        html += '<div class="left expense_monthly_amount span2">' + expenses[i].amount + '</div>';
        html += '<div class="left span1"><button class="del_expense btn btn-danger btn-mini">Delete</button></div>';
        html += '</div><div class="clear"></div>';

        $('#expense_list').append(html); 

    }

    for (i in inbounds) {
        var html = '<div class="inbound">';
        html += '<div class="left inbound_title span1">' + inbounds[i].title+ '</div>';
        html += '<div class="left inbound_allocation span1 ' + inbounds[i].colour + '"></div>';
        html += '<div id="inbound_amount_' + inbounds[i].colour + '" class="left inbound_amount span1">' + inbounds[i].amount + '</div>';
        html += '</div><div class="clear"></div>';

        $('#inbound').append(html); 

        var html = '<div class="summary_row" data-value="' + inbounds[i].colour + '">';
        html += '<div class="left summary_row_title">';
        html += inbounds[i].title + ':';
        html += '</div>';
        html += '<div id="amount_row' + inbounds[i].colour + '" class="right summary_row_amount">' + inbounds[i].amount + '</div>';
        html += '<div class="blank_row clear"></div>';
        html += '<div class="left summary_row_title">Remainder:</div>';
        html += '<div id="remainder_row' + inbounds[i].colour + '" class="right summary_remainder_amount"></div>';
        html += '<div class="blank_row clear"></div>';
        html += '</div>';
    
        $('.summary').append(html);
 
        summaries[inbounds[i].colour] = 0.00;

    }
   
    calculateSummaries();

}

function calculateSummaries() {

    // reset values
    $('.period_row').each(function(i,e) {
        summaries[$(e).attr('data-value')] = 0.00;
    });
    remainder_amount = 0.00;
    var total_amount = 0.00;
    
    
    $('.expense').each(function(i,e) {
        var colour = $(e).attr('data-value');
        var amount = parseFloat($(e).children('.expense_monthly_amount').html());
        if (!isNaN($('#inbound_amount_' + colour).html())) {
            if (colour=='orange') {
                summaries['blue'] = parseFloat(summaries['blue']) + (amount/2);
                $('#amount_rowblue').html(summaries['blue']);
                var remainder = parseFloat($('#inbound_amount_blue').html()) - summaries['blue'];
                console.log('amount: ' + amount + ' colour: ' + colour + ' ia: ' + parseFloat($('#inbound_amount_' + colour).html()) + ' sc: ' + summaries[colour] + ' rem: ' + remainder);
                $('#remainder_rowblue').html(remainder);

                summaries['green'] = parseFloat(summaries['green']) + (amount/2);
                $('#amount_rowgreen').html(summaries['green']);
                var remainder = parseFloat($('#inbound_amount_green').html()) - summaries['green'];
                console.log('amount: ' + amount + ' colour: ' + colour + ' ia: ' + parseFloat($('#inbound_amount_' + colour).html()) + ' sc: ' + summaries[colour] + ' rem: ' + remainder);
                $('#remainder_rowgreen').html(remainder);

            } else {
                summaries[colour] = parseFloat(summaries[colour]) + amount;
                $('#amount_row' + colour).html(summaries[colour]);
                var remainder = parseFloat($('#inbound_amount_' + colour).html()) - summaries[colour];
                console.log('amount: ' + amount + ' colour: ' + colour + ' ia: ' + parseFloat($('#inbound_amount_' + colour).html()) + ' sc: ' + summaries[colour] + ' rem: ' + remainder);
                $('#remainder_row' + colour).html(remainder);
            }
        }
    });

    console.log('ra: ' + remainder_amount);

    $('.summary_remainder_amount').each(function(i,e) {
        remainder_amount = parseFloat(remainder_amount) + parseFloat($(e).html());
    });

    $('.summary_row_amount').each(function(i,e) {
        total_amount = total_amount + parseFloat($(this).html());
    });
    
    $('#full_total_amount').html(total_amount); 

    console.log('ra-2: ' + remainder_amount);

    $('#total_remainder_amount').html(remainder_amount); 

}

function addPeriod() {
    if (!$('#period_colour_choice').val() || !$('#input_period_title').val()) {
        return false;
    }
    
    var colour_choice = $('#period_colour_choice').val();
    var period_title = $('#input_period_title').val();

    $.post('ajax.php?action=addup_period',
        {
        'colour':   colour_choice, 
        'title':    period_title
        },
        function(response) {
            var r = JSON.parse(response);
            if (r.error == "") {
                // add row in
                var html = '<div data-value="' + colour_choice + '" class="left span6 period_row">';
                html += '<div class="left period_colour span3 ' + colour_choice + '"></div>';
                html += '<div class="left period_title span2">' + period_title + '</div>';
                html += '</div>';

                $('#periods').append(html);
                $('#period_colour_choice').val('');
                $('#input_period_title').val('');
            }
        }
    );

}

function addExpense() {

    if (!$('#expense_title').val() || !$('#expense_colour_choice').val() || !$('#expense_amount').val()) {
        return false;
    }

    var colour_choice  = $('#expense_colour_choice').val();
    var expense_title  = $('#expense_title').val();
    var expense_amount = $('#expense_amount').val();

    $.post('ajax.php?action=addup_expense',
        {
        'title': expense_title,
        'colour': colour_choice,
        'amount': expense_amount
        },
        function(response) {
            var r = JSON.parse(response);
            if (r.error == "" ) {
                if (!r.id) { r.id = '0'; }
                var html = '<div class="expense" id="expense_' + r.id + '" data-id="' + r.id + '" data-value="' + colour_choice + '">';
                html += '<div class="left expense_title span2">' + expense_title + '</div>';
                html += '<div class="left expense_allocation span2 ' + colour_choice + '"></div>';
                html += '<div class="left expense_monthly_amount span2">' + expense_amount + '</div>';
                html += '<div class="left span1"><button class="del_expense btn btn-danger btn-mini">Delete</button></div>';
                html += '</div><div class="clear"></div>';

                $('#expense_list').append(html);
                $('#expense_colour_choice').val('');
                $('#expense_title').val('');
                $('#expense_amount').val('');
                
                expenses.push({"colour":colour_choice, "title": expense_title, "amount": expense_amount});

                calculateSummaries();

            }
        }
    );
}

function addInbound() {
    if (!$('#inbound_title').val() || !$('#inbound_amount').val() || !$('#inbound_colour_choice').val()) return false;


    var colour_choice  = $('#inbound_colour_choice').val();
    var inbound_title  = $('#inbound_title').val();
    var inbound_amount = $('#inbound_amount').val();

    $.post('ajax.php?action=addup_inbound',
        {
        'title': inbound_title,
        'colour': colour_choice,
        'amount': inbound_amount
        },
        function(response) {
            var r = JSON.parse(response);
            if (r.error == "" ) {
                var html = '<div class="inbound_row">';
                html += '<div class="left inbound_title span1">' + inbound_title + '</div>';
                html += '<div class="left inbound_allocation span1 ' + colour_choice + '"></div>';
                html += '<div id="inbound_amount_' + colour_choice + '" class="left inbound_monthly_amount span1">' + inbound_amount + '</div>';
                html += '</div><div class="clear"></div>';

                $('#inbound').append(html);
                $('#expense_colour_choice').val('');
                $('#expense_title').val('');
                $('#expense_amount').val('');

            }
        }
    );


}

function getExpenses() {
    $.post('ajax.php?action=get_expenses',false,
        function(resp) {
            expenses = JSON.parse(resp);
            return expenses;
        }
    );
}

function getPeriods() {
    $.post('ajax.php?action=get_periods',false,
        function(resp) {
            periods = JSON.parse(resp);
            return periods;
        }
    );
}

function getInbound() {
    $.post('ajax.php?action=get_inbounds',false,
        function(resp) {
            inbounds = JSON.parse(resp);
            return inbounds;
        }
    );
}

function delExpense(id) {
    if (id == 0) return false;
    console.log('ddd: ' + id);
    $.post('ajax.php?action=del_expense',
        {'eid': id},
        function(resp) {
            result = JSON.parse(resp);
            if (result.error=="") {
                // remove row
                $('#expense_' + id).remove();
            }
        }
    );

}

