import React from "react";
import "./Styles.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context";

const Index = () => {
  const { user, logout } = React.useContext(AppContext);

  return (
    <div class="homepage" id="parallax-wrapper">
      <section class="d-flex justify-content-between align-items-center px-3 py-2">
        <div class="">
          <hgroup>
            <h1>Greenusys</h1>
          </hgroup>
        </div>
        <div class="d-flex">
          {!user ? (
            <>
              <Link to="/signup" className="btn mx-2 btn-white">
                Sign Up
              </Link>
              <Link to="/login" className="btn mx-2 btn-white">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/details" className="btn mx-2 btn-white">
                {user.name}
              </Link>
              <button onClick={logout} className="btn mx-2 btn-white">
                Logout
              </button>
            </>
          )}
        </div>
      </section>

      <section>
        <div class="p-three parallax-inner">
          <h2>About Greenusys</h2>
        </div>
      </section>
      <section>
        <div class="content-text">
          <p>
            <span class="first-letter red">T</span>
            he Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
            voluptatibus cupiditate ipsa numquam sit, corporis ea voluptatum hic
            impedit. Maiores voluptatum ratione earum dolore consequuntur ad
            numquam reiciendis, ipsa amet, iusto nostrum voluptates, eveniet
            dicta. Alias dignissimos quibusdam tempora quaerat optio,
            exercitationem dolorum provident ducimus doloribus, earum cumque
            pariatur odit libero voluptatem eaque, quos recusandae est? Nesciunt
            repudiandae ducimus asperiores!
          </p>
          <div class="line-break"></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eius,
            exercitationem quos eos vero consequatur pariatur nisi modi voluptas
            expedita culpa mollitia consequuntur eveniet inventore ipsam
            molestiae asperiores tempora harum, repudiandae alias deleniti saepe
            similique! Nisi quam odit, ducimus harum facere culpa modi autem hic
            cupiditate dolores, nihil fuga alias.
          </p>
        </div>
      </section>

      <section>
        <div class="p-two parallax-inner">
          <h2>About Exam Test</h2>
        </div>
      </section>
      <section>
        <div class="content-text">
          <p>
            <span class="first-letter darkgreen">L</span>
            orem ipsum dolor, sit amet consectetur adipisicing elit. Error amet
            adipisci facilis ipsum, esse quod aspernatur placeat laborum?
            Voluptates sed quos eius praesentium soluta officia vero quisquam
            accusantium, voluptatem blanditiis cum ex atque. Laboriosam nisi
            perspiciatis repellat, consequuntur facilis harum fuga commodi
            distinctio voluptas cupiditate dolores blanditiis assumenda eaque
            esse incidunt officiis illum quae quasi culpa autem a aut. Sequi?
          </p>
          <div class="line-break"></div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
            delectus id nisi doloremque. Minima culpa quis fuga velit
            necessitatibus soluta error qui nemo. Sit itaque similique
            reprehenderit facere dicta, nulla repellat at cumque delectus quasi
            rerum quidem? Itaque eveniet sunt minima, eum odio eos in quibusdam
            debitis harum quo optio?
          </p>
        </div>
      </section>

      <section>
        <div class="p-four parallax-inner">
          <h2>Footer</h2>
        </div>
      </section>

      <footer>
        <p>
          <span class="first-letter skyblue">G</span>Greenusys Technology, Noida
          Lorem, ipsum dolor.
        </p>
      </footer>
    </div>
  );
};

export default Index;
