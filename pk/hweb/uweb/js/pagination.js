var PaginationController = function(){
    this.offset = 0;
    this.perPage = 10;
    this.lastPageSize = null;
    this.result = [];
    this.total = null;
    this.pageCount = null;
    this.current = 1;
    this.rangeLength = 11;
    this.rangeStaticPos = null;
};

PaginationController.prototype.init = function(config){
    if(config) {
        if(config.result) {
            this.result =  config.result;
        }
        if(config.perPage) {
            this.perPage = config.perPage ;
        }
    }
    this.offset = 0;
    this.current = 1;
    this.rangeStaticPos = Math.ceil(this.rangeLength / 2);
    
    var isResultExist = this.result && this.result.length > 0;
    this.total = isResultExist ? this.result.length : 0;
    this.lastPageSize = this.total % this.perPage;
    this.pageCount = isResultExist ? Math.floor(this.total / this.perPage) + (this.lastPageSize ? 1 : 0) : 0;
};

PaginationController.prototype.hasPreviousPage = function(){
    return this.current > 1 ;
};

PaginationController.prototype.hasNextPage = function(){
    return this.current < this.pageCount;
};

PaginationController.prototype.getPageRange = function(){
    var start = 1, stop = this.pageCount + 1;
    var isPagesNotWithInRangeCount = this.pageCount > this.rangeLength;

    if(isPagesNotWithInRangeCount) {
        if(this.rangeStaticPos)
        {
            var staticPos = this.rangeStaticPos;
            var staticPosRest = this.rangeLength - staticPos;
            var isBeforeStaticPos = this.current <= staticPos;

            start = isBeforeStaticPos ? 1 : (this.current < (this.pageCount - staticPosRest) ? (this.current - staticPos) + 1: this.pageCount - this.rangeLength);
            stop = (isBeforeStaticPos ? this.rangeLength : (this.current < (this.pageCount - staticPosRest) ? (this.current + staticPosRest): this.pageCount) ) + 1;
        }
        else
        {
            var isRangeEndWithInPageCount = (this.current + this.rangeLength) <  this.pageCount ;
            start = isRangeEndWithInPageCount ? this.current : (this.pageCount - this.rangeLength);
            stop = isRangeEndWithInPageCount ? (this.current + this.rangeLength) : this.pageCount+1;
        }
    }
    return _.range(start, stop);
};

PaginationController.prototype.isTail = function(){
    return (this.current === this.pageCount) && this.lastPageSize ? true : false;
};

PaginationController.prototype.getPreviousPage = function(){
    var toRet = [];
    if(this.hasPreviousPage()) {
        var perPage = (this.isTail() ? this.lastPageSize : this.perPage);
        this.offset -= perPage;
        toRet = this.result.slice(this.offset - this.perPage, this.offset);
        this.current--;
    }
    return toRet;
};

PaginationController.prototype.getNextPage = function(){
    var toRet = [];
    if(this.hasNextPage()) {
        this.current++ ;
        var perPage = (this.isTail() ? this.lastPageSize : this.perPage);
        toRet = this.result.slice(this.offset, this.offset + perPage);
        this.offset += perPage;
    }
    return toRet;
};

PaginationController.prototype.getPage = function(pageNumber){
    var toRet = [];
    this.current = pageNumber;
    this.offset = (pageNumber-1) * this.perPage;
    var perPage = (this.isTail() ? this.lastPageSize : this.perPage);
    if(pageNumber === 1) {
        toRet = this.result.slice(0, perPage);
    }
    else if (pageNumber > 1 && pageNumber <= this.pageCount) {
        toRet = this.result.slice(this.offset, this.offset + perPage);
    }
    this.offset += this.perPage;
    return toRet;
};