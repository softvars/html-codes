<div class="modal bottom" id="modal-edit-password">
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
							<div class="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3">
								<div class="row head">
									<div class="col-sm-12">Modifica password</div>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<form method="POST" class="change-password-form">
											<fieldset>
												<label for="old-passsword">vecchia password</label>
												<div class="input-group">
													<input type="text" name="fake_password" placeholder="Inserisci qui la tua vecchia password..." class="text-input fake_password" autocomplete="off"/> 
													<input type="password" name="oldPassword" id="old-password" class="text-input hide-it" autocomplete="off"/>
													<span class="input-group-btn">
														<span class="input-group-addon"></span>
													</span>
													<div class="input-msg">Messaggio di errore</div>
												</div>
								    		</fieldset>
								    		<fieldset>
												<label for="new-password">nuova password</label>
												<div class="input-group">
													 <input type="text" name="fake_password" placeholder="Password" class="text-input fake_password" autocomplete="off"/>
													 <input type="password" name="password" id="password" class="text-input hide-it" autocomplete="off"/> 
													<span class="input-group-btn">
														<span class="input-group-addon"></span>
													</span>
													<div class="input-msg">Messaggio di errore</div>
												</div>
								    		</fieldset>
								    		<fieldset>
												<label for="confirm-password">conferma nuova password</label>
												<div class="input-group">
													<input type="text" name="fake_password" placeholder="Ripeti password" class="text-input fake_password" autocomplete="off"/> 
													<input type="password" name="confirmPassword" id="confirm-password" class="text-input hide-it" autocomplete="off"/>
													<span class="input-group-btn">
														<span class="input-group-addon"></span>
													</span>
													<div class="input-msg">Messaggio di errore</div>
												</div>
								    		</fieldset>
								    		
							    			<fieldset>
							    				<input type="submit" id="change_password_btn" name="send" value="SALVA MODIFICHE">
							    				<div data-dismiss="modal" class="cancel"><span>Annulla</span></div>
							    			</fieldset>
					    				</form>
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