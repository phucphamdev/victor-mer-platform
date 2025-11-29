import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import CollectionArea from "../components/collection/collection-area";

const CollectionsPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Collections" subtitle="Collections List" />
        {/* breadcrumb end */}

        {/* collection area start */}
        <CollectionArea />
        {/* collection area end */}
      </div>
    </Wrapper>
  );
};

export default CollectionsPage;
