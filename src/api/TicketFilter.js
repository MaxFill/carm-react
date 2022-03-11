export class TicketFilter {
    constructor(userId, name, ticketId, requestId, userName, ticketInfo, group, jeopardyStatus, dateIssueFrom, dateIssueTo, dateJeopardyFrom, dateJeopardyTo, statuses, positionStart, positionEnd) {
        this.userId = userId;
        this.name = name;
        this.ticketId = ticketId;
        this.requestId = requestId;
        this.userName = userName;
        this.ticketInfo = ticketInfo;
        this.group = group;
        this.jeopardyStatus = jeopardyStatus;
        this.dateIssueFrom = dateIssueFrom;
        this.dateIssueTo = dateIssueTo;
        this.dateJeopardyFrom = dateJeopardyFrom;
        this.dateJeopardyTo = dateJeopardyTo;
        this.statuses = statuses;
        this.positionStart = positionStart;
        this.positionEnd = positionEnd;
    }
}