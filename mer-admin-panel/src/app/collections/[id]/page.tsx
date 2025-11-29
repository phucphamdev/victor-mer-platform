import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import CollectionEditArea from "@/app/components/collection/collection-edit-area";

const CollectionDynamicPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Collections" subtitle="Edit Collection" />
        {/* breadcrumb end */}

        {/* collection edit area start */}
        <CollectionEditArea id={params.id} />
        {/* collection edit area end */}
      </div>
    </Wrapper>
  );
};

export default CollectionDynamicPage;
