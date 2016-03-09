<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="container-fluid profile-header">
    <div class="row">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="profile-pic">
                        <div class="profile-pic-wrap">
                            <img src="<c:url value='/resources/img/profile-big.png'/>" alt="Immagine profilo" />
                        </div>
                    </div>
                    <div class="profile-username text-capitalize">${userInfo.displayName.toLowerCase()}</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid profile-menu">
    <div class="row">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="menu" id="profile-menu">
                        <ul>
                            <li>
                                <a class="profile" title="Profilo" href="#Profilo">profilo</a>
                            </li>
                            <li>
                                <a class="address" title="Indirizzi" href="#Indirizzi">indirizzi</a>
                            </li>
                            <li>
                                <a class="cards inner" title="Carte" href="#Carte">carte</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>