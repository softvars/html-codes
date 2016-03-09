    <script type="template" id="addressListTemplate">
        <@ _.each(addresses,function(address, key, list){ @>
            <div class="col-sm-4 col-xs-12 col-md-3">
                <div class="address_container">
                    <div class="title"><@=address.alias@></div>
                    <div><@=address.street@>,</div>
                    <div><@=address.zip@> - <@=address.city@>(<@=address.prov@>)</div>
                    <div><@=address.country@></div>
                    <div>
                        <span class="edit_address" data-hash="#edit_address" data-addressId="<@=address.addressId@>">Modifica</span>
                        <span class="delete_address" id="popover-<@=address.addressId@>">Cancella</span>
                    </div>
                </div>
            </div>
        <@ }); @>
        <!--div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-actions"><div class="negative">NO</div><div class="positive">SI</div></div></div-->
	</script>