import React from "react";
import ReportPopup from "./ReportPopup";
import { postPostReport } from "../communityApi/reportApi";

const PostReportPopup = ({ isOpen, onClose, postId }) => (
  <ReportPopup
    isOpen={isOpen}
    onClose={onClose}
    title="게시글 신고"
    onSubmit={({ title, detail }) =>
      postPostReport({
        postReportTitle: title,
        postReportDetail: detail,
        postId,
      })
    }
  />
);

export default PostReportPopup;
