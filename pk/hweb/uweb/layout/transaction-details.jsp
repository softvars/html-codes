<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="modal fade in bottom" id="modal-detail-transaction" tabindex='-1'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 close-wrap">
                                <div class="close" data-dismiss="modal"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8 col-md-offset-2">
                                <div class="row head">
                                    <div class="col-sm-12">
                                        <div class="row">
                                            <div class="col-sm-9">
                                                <span class="title">Dettaglio transazione</span>
                                                <span>n.<span class="num"></span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row transaction">
                                    <div class="col-sm-12">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="date">
                                                    <div class="date-only"></div>
                                                    <div class="time"></div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-5">
                                                <div class="upper">
                                                    <div class="beneficiary"></div>
                                                </div>
                                                <div class="lower">
                                                    <div class="card">
                                                        <span class="name"></span>
                                                        <span class="dot hidden-xs"> &#183; </span>
                                                        <span class="type"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-3">
                                                <div class="upper border-right">
                                                    <div class="amount">&#8364; <span></span></div>
                                                </div>
                                                <div class="lower border-right">
                                                    <div class="state"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row details">
                                    <div class="col-sm-12">
                                        <div class="grid-details">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>