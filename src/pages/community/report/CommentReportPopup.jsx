import React from "react";
import ReportPopup from "./ReportPopup";
import { postCommentReport } from "../communityApi/reportApi";

const CommentReportPopup = ({ isOpen, onClose, commentId }) => (
  <ReportPopup
    isOpen={isOpen}
    onClose={onClose}
    title="댓글 신고"
    onSubmit={({ title, detail }) =>
      postCommentReport({
        commentReportTitle: title,
        commentReportDetail: detail,
        commentId,
      })
    }
  />
);

export default CommentReportPopup;
