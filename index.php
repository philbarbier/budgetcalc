<!DOCTYPE html>
<html>
    <head>
        <title>Budget Calc</title>
        <script src="assets/jquery-1.7.1.js"></script>
        <script type="text/javascript" src="assets/bootstrap-2.0.2.js"></script>
        <script type="text/javascript" src="assets/scripts.js"></script>
        <link rel="stylesheet" href="assets/bootstrap.min.css" /> 
        <link rel="stylesheet" href="assets/styles.css" />


    </head>

    <body>
        <div id="main_container">
            <div id="expenses" class="left ">
                <div id="expense_list">
                    <div class="expense_header">
                        <div class="left expense_title span2">Title</div>
                        <div class="left expense_allocation span2">Allocation</div>
                        <div class="left expense_monthly_amount span2">Monthly amount</div>
                    </div>
                    <div class="clear"></div>
                    <div class="add_expense">
                        <div class="left span2">
                            <input type="text" class="input-medium" name="expense_title" id="expense_title" value="" placeholder="Title" />
                        </div>
                        <div class="left span2">
                            <div name="btn-group" id="expense_allocation" class="dropdown input-append">
                                <button class="btn dropdown-toggle" data-toggle="dropdown">
                                    Allocation
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                </ul>
                                <input type="hidden" name="expense_colour_choice" id="expense_colour_choice" value="" />
                            </div>
                        </div>
                        <div class="left span2">
                            <input type="text" class="input-mini" name="expense_amount" id="expense_amount" value="" placeholder="0.00" />
                        </div>
                        <div class="left span1">
                            <button class="btn btn-success btn-mini" id="add_expense">Add</button>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div id="summaries" class="left span3">
                <div class="summary">
                    <div class="summary_row">
                        <div class="left summary_row_title">
                            Full total:
                        </div>
                        <div id="full_total_amount" class="right"></div>
                        <div class="blank_row clear"></div>
                        <div class="left summary_row_title">
                            Remainder:
                        </div>
                        <div id="total_remainder_amount" class="right"></div>
                        <div class="blank_row clear"></div>
                    </div>
                </div>
            </div>
            <div id="inbound" class="span6 left">
                <div class="inbound_row">
                    <div class="inbound_title left span1">Title</div>
                    <div class="inbound_colour left span1">Allocation</div>
                    <div class="inbound_amount left span1">Amount</div>
                </div>
                <div class="clear"></div>
                <div class="inbound_row">
                    <div class="left span1"><input type="text" name="inbound_title" id="inbound_title" class="input-medium" value="" placeholder="Inbound title" /></div>
                    <div class="left span1">
                        <div name="btn-group" id="inbound_allocation" class="dropdown input-append">
                            <button class="btn dropdown-toggle" data-toggle="dropdown">
                                Allocation
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                            </ul>
                            <input type="hidden" name="inbound_colour_choice" id="inbound_colour_choice" value="" />
                        </div>
                    </div>
                    <div class="left span1"><input type="text" name="inbound_amount" id="inbound_amount" class="input-mini" value="" placeholder="0.00" /></div>
                    <div class="left span1"><button class="btn btn-success btn-mini" id="add_inbound">Add</button></div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
            <div id="periods" class="span8 left">
                <div class="left span6">
                    <div class="left period_colour span3">Colour</div>
                    <div class="left period_title span2">Title</div>
                </div>
                <div class="clear"></div>
                <div class="period span8 left">
                    <div class="left period_colour span3">
                        <div name="btn-group" id="period_colour_list" class="span2 dropdown input-append">
                            <button class="btn dropdown-toggle" data-toggle="dropdown">
                                Period colour 
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><div data-value="blue" class="blue"></div></li>
                                <li><div data-value="orange" class="orange"></div></li>
                                <li><div data-value="green" class="green"></div></li>
                            </ul>
                        </div>
                        <input type="hidden" name="period_colour_choice" id="period_colour_choice" value="" />
                    </div>
                    <div class="left period_title span2">
                        <input type="name" class="input-small" id="input_period_title" value="" placeholder="Period title" />
                    </div>
                    <div class="left span1">
                        <button class="btn btn-success btn-mini" id="add_period">Add</button>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </body>
</html>
