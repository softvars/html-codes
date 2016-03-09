
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<tiles:insertDefinition name="main.transactions">
<tiles:putAttribute name="title">
    HYPE WALLET - Cronologia acquisti
</tiles:putAttribute>
<tiles:putAttribute name="javascript">
    <script type="text/javascript"  src="<c:url value="/resources/js/pagination.js"/>"></script>
    <script type="text/javascript"  src="<c:url value="/resources/js/controller/transaction.js"/>"></script>
    <script type="text/javascript"  src="<c:url value="/resources/js/controller/transaction-all.js"/>"></script>
    <script type="template" id="transactionTemplate">
        <@ if(!transactionsObj.isTransactionListEmpty && pagination.pageCount < 1) {@>
        <div class="row no-records">
            <div class="col-sm-12">
                <div class="title"><@=transactionsObj.MESSAGES.no_result_title@>.</div>
                <div class="subtitle"><@=transactionsObj.MESSAGES.no_result_sub_title@>.</div>
            </div>
        </div>
        <@}@>
        <@ if(transactionsObj.isTransactionListEmpty || up_common.isNoRecord) {@>
        <div class="row no-records">
            <div class="col-sm-12">
                <div class="title">Al momento non hai effettuato nessun movimento.</div>
                <div class="subtitle">Qui troverai l&#8217;elenco dei tuoi ultimi movimenti in ordine cronologico.</div>
            </div>
        </div>
        <@}else {@>
        <@ _.each(transactions,function(transaction, key, list){ @>
            <@ var status_ = transaction.meta.status; @>
            <div data-idx="<@=transaction.meta.idx@>" class="row <@= key%2 == 0 ? 'even' : 'odd'@><@= this.TXN_STATUS_LIST_2[status_] ? ' '+this.TXN_STATUS_LIST_2[status_] : ''@>">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-xs-2 col-sm-2">
                            <div class="upper">
                                <div class="month"><@= this.MONTHS_SHORT[transaction.meta.dateTokens[0]] @> <span class="year"><@= transaction.meta.dateTokens[2] @> </span> </div>
                            </div>
                            <div class="lower">
                                <div class="day"><@= transaction.meta.dateTokens[1] @></div>
                            </div>
                        </div>
                        <div class="col-xs-5 col-sm-7">
                            <div class="upper">
                                <div class="beneficiary"><@= transaction.payedTo @></div>
                            </div>
                            <div class="lower">
                                <div class="card">
                                    <span class="name"><@= transaction.meta.aliasCreditCard @></span>
                                    <span class="dot hidden-xs"> &#183; </span>
                                    <span class="type"><@= transaction.payedWith @> <@= transaction.creditCard @></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-5 col-sm-3">
                            <div class="upper">
                                <div class="amount">&euro; <@= transaction.totalOrderPrice @></div>
                            </div>
                            <div class="lower">
                                <div class="state"><@= status_ @></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <@ }, transactionsObj); @>
        <@ if(pagination.pageCount > 1) {@>
        <div class="row paging">
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-xs-2 col-sm-1 prev<@= pagination.hasPreviousPage()?'':' disabled'@>">
                        <a href="#" data-state="prev" title="Precedente">
                            <img src="<c:url value='/resources/img/arrow-paginate-left.png'/>" alt="Precedente" />
                        </a>
                    </div>
                    <div class="col-xs-8 col-sm-10 page-num pages-n<@=pagination.pageCount@>">
                    <@ var rang = pagination.getPageRange(); @>
                    <@_.each(rang, function(pageNum, key, list){ @>
                        <span<@=(this.current==pageNum) ?' class="current"':''@>>
                            <a href="#" data-state="<@=pageNum@>"><@=pageNum@></a>
                        </span>
                        <@ if(rang[rang.length-1] < this.pageCount && pageNum === rang[rang.length-1]) {@>
                            <span class="ellipsis"><a data-state2="ellipsis" href="#">...</a></span>
                        <@} }, pagination); @>
                    </div>
                    <div class="col-xs-2 col-sm-1 next<@= pagination.hasNextPage()?'':' disabled'@>">
                        <a href="#" data-state="next" title="Successivo">
                            <img src="<c:url value='/resources/img/arrow-paginate-right.png'/>" alt="Successivo" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <@} }@>
    </script>
    <script type="template" id="cardsTemplate">
        <@ _.each(cards,function(card, key, list){ @>
            <div class="card-small" data-card-filter="<@= card.meta.cardFilter @>">
                <div class="card <@= card.meta.circuitName @>">
                    <div class="check-box"></div>
                    <div class="type <@= card.meta.circuitName @>"></div>
                    <div class="code">
                        <div class="asterisk">****</div>
                        <div class="last-digits"><@= this.extractPan(card.maskedPan) @></div>
                    </div>
                </div>
                <div class="detail">
                    <div class="name"><@= card.meta.cardAlias @></div>
                    <div class="validity">validit&#224;</div>
                    <div class="date"><@= card.expiryMonth @>/<@= card.expiryYear @></div>
                </div>
            </div>
        <@ }, transactionsObj); @>
        <div class="filter-apply-button">
            <fieldset>
                <input type="submit" name="send" value="APPLICA FILTRI" />
            </fieldset>
        </div>
    </script>
</tiles:putAttribute>
    <tiles:putAttribute name="app-add">
    <div></div>
    </tiles:putAttribute>
    <tiles:putAttribute name="body">
        <div class="row">
            <div class="col-md-8">
                <div class="movements">
                    <div class="container-fluid transactions-container">
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="filters">
                    <div id="dimmer-filter" class="toggle-filter"></div>
                    <div class="container-fluid">
                        <div class="row head">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-12">Filtra</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="divider"></div>
                            </div>
                        </div>
                        <div class="row filter-type">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="filter-name">per data</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6">
                                        <div class="from">
                                            <div class="input-group-block">
                                                <input type="text" name="from" placeholder="da" id="from__datepicker" class="edit-date"/> 
                                                <img class="datepicker from__datepicker calendar-icon" id="from-datepicker-img" src="<c:url value='/resources/img/calendar.png'/>" />
                                                <div class="input-msg cust_width_5"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="to">
                                            <div class="input-group-block">
                                                <input type="text" name="to" placeholder="al" id="to__datepicker" class="edit-date"/> 
                                                <img class="datepicker to__datepicker calendar-icon" id="to-datepicker-img" src="<c:url value='/resources/img/calendar.png'/>" />
                                                <div class="input-msg cust_width_5"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="divider"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="filter-name">per beneficiario</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="beneficiary">
                                            <input type="text" name="beneficiary" id="beneficiary-filter" placeholder="Beneficiario" /> 
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="divider"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="filter-name">per descrizione</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="description">
                                            <input type="text" name="description" id="description-filter" placeholder="Dettaglio dell&#39;acquisto" /> 
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="divider"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="filter-name">per stato</div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 state">
                                        <div class="row">
                                            <div class="col-xs-4 col-md-12 col-lg-4">
                                                <div class="completed">
                                                    <input id="completed" type="radio" name="state" value="completed" /> 
                                                    <label for="completed" class="noselect">eseguita</label>
                                                </div>
                                            </div>
                                            <div class="col-xs-4 col-md-12 col-lg-4">
                                                <div class="denied">
                                                    <input id="denied" type="radio" name="state" value="denied" />
                                                    <label for="denied" class="noselect">negata</label>
                                                </div>
                                            </div>
                                            <div class="col-xs-4 col-md-12 col-lg-4">
                                                <div class="rejected">
                                                    <input id="rejected" type="radio" name="state" value="rejected" /> 
                                                    <label for="rejected" class="noselect">stornata</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row filter-state-row-2">
                                            <div class="col-xs-4 col-md-12 col-lg-4">
                                                <div class="deleted">
                                                    <input id="deleted" type="radio" name="state" value="deleted" /> 
                                                    <label for="deleted" class="noselect">cancellata</label>
                                                </div>
                                            </div>
                                            <div class="col-xs-4 col-md-12 col-lg-4">
                                                <div class="all-state">
                                                    <input id="all-state" type="radio" name="state" value="all-state" /> 
                                                    <label for="all-state" class="noselect">tutte</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="divider"></div>
                                    </div>
                                </div>
                                <div class="row hide_it small-cards">
                                    <div class="col-xs-6 col-md-6">
                                        <div class="filter-name">per carta</div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="check-all align-right">
                                            <input id="check-all" type="checkbox" name="check-all" value="check-all" /> 
                                            <label for="check-all" class="noselect">seleziona tutte</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 cards-small">
                                    </div>
                                </div>
                                <div class="row hide_it small-cards">
                                    <div class="col-sm-12">
                                        <div class="divider"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </tiles:putAttribute>
</tiles:insertDefinition>

