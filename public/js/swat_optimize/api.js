const renderFullPatch = (api) => {
    return `${baseApi}${api}?access_token=${currentUser.token}`;
}
const fullPathApiMeetingReason = renderFullPatch("lead-deal-type/3");
const fullPathApiCancelReason = renderFullPatch("cancel-reason/list");