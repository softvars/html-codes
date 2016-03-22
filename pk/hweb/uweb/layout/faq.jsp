<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="<c:url value="/resources/js/faq.js"/>"></script>
<script type="template" id="faqTemplate">
<div class="modal-dialog">
<div class="modal-content">
<div id="faq-container">
    <div class="row">
        <div class="col-md-12">
            <div class="faq">
                <div class="container-fluid">
					<div class="container">
					<div class="row">
						<div class="col-md-12 close-wrap">
							<div class="close" data-dismiss="modal"></div>
						</div>
					</div>
                    <div class="row head">
                        <div class="col-sm-12">
                            <div class="row">
                                <div class="col-sm-12"><@= heading @></div>
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
                            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <@ _.each(qna, function(qa, key, list) { var idx = key +1 ;@>
                                <div class="panel panel-default">
                                    <div class="panel-heading" role="tab" id="heading<@= idx @>">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse<@= idx @>" aria-expanded="false" aria-controls="collapse<@= idx @>" class="collapsed">
                                                <@= qa.q @>
                                             </a>
                                         </h4>
                                    </div>
                                    <div id="collapse<@= idx @>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading<@= idx @>">
                                        <div class="panel-body">
                                            <@= qa.a @>
                                        </div>
                                    </div>
                                </div>
                                <div class="divider"></div>
                                <@ }); @>
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
</script>