export async function SubscriptionsPage() {
  const subscriprionPage = document.createElement("div");
  subscriprionPage.id = "subscription-page";

  const plans = {
    basic: {
      price: "$9.99/Month",
      content:
        "Access to a wide selection of movies and shows, including some new releases.",
      devices: "Watch on one device simultaneously",
      trail: "7 Days",
      cancel: "Yes",
      hdr: "No",
      dolby: "No",
      ad: "No",
      offline: "No",
      sharing: "No",
    },
    standart: {
      price: "$12.99/Month",
      content:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      devices: "Watch on Two device simultaneously",
      trail: "7 Days",
      cancel: "Yes",
      hdr: "Yes",
      dolby: "Yes",
      ad: "Yes",
      offline: "Yes, for select titles.",
      sharing: "Yes, up to 5 family members.",
    },
    premium: {
      price: "$14.99/Month",
      content:
        "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      devices: "Watch on Four device simultaneously",
      trail: "7 Days",
      cancel: "Yes",
      hdr: "Yes",
      dolby: "Yes",
      ad: "Yes",
      offline: "Yes, for all titles.",
      sharing: "Yes, up to 6 family members.",
    },
  };

  const subscriptionSection = document.createElement("section");
  subscriptionSection.className = "subscription";
  subscriptionSection.innerHTML = `
    <div class='subscription-header'>
      <div class='subscription-header-info'>
        <h2>Choose the plan that's right for you</h2>
        <p>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
      </div>
      <div class='subscription-header-btns'>
        <button class='subscription-btn monthly-btn subscription-hover'>Monthly</button>
        <button class='subscription-btn yearly-btn'>Yearly</button>
      </div>
    </div>

    <div class='subscription-plans'>
      <div class='subscriprion-plan'>
        <h3>Basic Plan</h3>
        <p>Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.</p>
        <div class='subscription-price subscription-price-monthly'>
          <span>$9.99</span>
          <span>/month</span>
        </div>
        <div class='subscription-price subscription-price-yearly closed'>
          <span>$19.99</span>
          <span>/yearly</span>
        </div>
        <div class='subscription-plan-btns'>
          <button>Start free trial</button>
          <button>Choose plan</button>
        </div>
      </div>
      <div class='subscriprion-plan'>
        <h3>Standard Plan</h3>
        <p>Access to a wider selection of movies and shows, including most new releases and exclusive content</p>
        <div class='subscription-price subscription-price-monthly'>
          <span>$12.99</span>
          <span>/month</span>
        </div>
        <div class='subscription-price subscription-price-yearly closed'>
          <span>$22.99</span>
          <span>/yearly</span>
        </div>
        <div class='subscription-plan-btns'>
          <button>Start free trial</button>
          <button>Choose plan</button>
        </div>
      </div>
      <div class='subscriprion-plan'>
        <h3>Premium Plan</h3>
        <p>Access to a widest selection of movies and shows, including all new releases and Offline Viewing</p>
        <div class='subscription-price subscription-price-monthly'>
          <span>$14.99</span>
          <span>/month</span>
        </div>
        <div class='subscription-price subscription-price-yearly closed'>
          <span>$34.99</span>
          <span>/yearly</span>
        </div>
        <div class='subscription-plan-btns'>
          <button>Start free trial</button>
          <button>Choose plan</button>
        </div>
      </div>
    </div>
  `;

  const buttons = subscriptionSection.querySelectorAll(".subscription-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("subscription-hover"));
      btn.classList.add("subscription-hover");

      const yearlyBtn = btn.classList.contains(".yearly-btn");

      const monthly = subscriptionSection.querySelectorAll(
        ".subscription-price-monthly",
      );
      const yearly = subscriptionSection.querySelectorAll(
        ".subscription-price-yearly",
      );

      if (yearlyBtn) {
        yearly.forEach((y) => y.classList.remove("closed"));
        monthly.forEach((m) => m.classList.add("closed"));
        plans.basic.price = "$19.99/yearly";
        plans.standart.price = "$22.99/yearly";
        plans.premium.price = "$34.99/yearly";
      } else {
        yearly.forEach((y) => y.classList.add("closed"));
        monthly.forEach((m) => m.classList.remove("closed"));
        plans.basic.price = "$9.99/Month";
        plans.standart.price = "$12.99/Month";
        plans.premium.price = "$14.99/Month";
      }

      const subPlan =
        subscriptionSection.querySelectorAll(".subscriprion-plan");
      subPlan.forEach((p) => {
        p.classList.remove("is-reveal");
        void p.offsetWidth;
        p.classList.add("is-reveal");
      });

      const activePlan = getActivePlanName();
      updatePlanInfo(plans[activePlan]);
    });
  });

  const subscriptionInfo = document.createElement("section");
  subscriptionInfo.className = "subscription-info";
  subscriptionInfo.innerHTML = `
    <div class='subsciption-info-heading'>
      <h2>Compare our plans and find the right one for you</h2>
      <p>StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that's right for you.</p>
    </div>
    <div class='subscriptiion-switcher'>
      <button class='sub-swithcer-btn basic is-active-sub' data-plan='basic'>Basic</button>
      <button class='sub-swithcer-btn standart' data-plan='standart'>Standart</button>
      <button class='sub-swithcer-btn premium' data-plan='premium'>Premium</button>
    </div>
  `;

  const subPlansInfo = document.createElement("section");
  subPlansInfo.className = "subscription-plans-info";
  subPlansInfo.innerHTML = `
    <div class='price'>
      <p>Price</p>
      <p class='sub-price-month'>${plans.basic.price}</p>
    </div>
    <div class='trial'>
      <p>Free Trial</p>
      <p>${plans.basic.trail}</p>
    </div>
    <div class='content'>
      <p>Content</p>
      <p class='sub-content'>${plans.basic.content}</p>
    </div>
    <div class='devices'>
      <p>Devices</p>
      <p class='sub-devices'>${plans.basic.devices}</p>
    </div>
    <div class='cancel'>
      <p>Cancel Anytime</p>
      <p>${plans.basic.cancel}</p>
    </div>
    <div class='hdr'>
      <p>HDR</p>
      <p>${plans.basic.hdr}</p>
    </div>
    <div class='dolby'>
      <p>Dolby Atmos</p>
      <p>${plans.basic.dolby}</p>
    </div>
    <div class='ad'>
      <p>Ad - Free</p>
      <p>${plans.basic.ad}</p>
    </div>
    <div class='offline'>
      <p>Offline Viewing</p>
      <p>${plans.basic.offline}</p>
    </div>
    <div class='sharing'>
      <p>Family Sharing</p>
      <p>${plans.basic.sharing}</p>
    </div>
  `;

  const price = subPlansInfo.querySelector(".sub-price-month");
  const content = subPlansInfo.querySelector(".sub-content");
  const devices = subPlansInfo.querySelector(".sub-devices");
  const trail = subPlansInfo.querySelector(".trial p:last-child");
  const cancel = subPlansInfo.querySelector(".cancel p:last-child");
  const hdr = subPlansInfo.querySelector(".hdr p:last-child");
  const dolby = subPlansInfo.querySelector(".dolby p:last-child");
  const ad = subPlansInfo.querySelector(".ad p:last-child");
  const offline = subPlansInfo.querySelector(".offline p:last-child");
  const sharing = subPlansInfo.querySelector(".sharing p:last-child");

  function updatePlanInfo(plan) {
    ((price.textContent = plan.price),
      (content.textContent = plan.content),
      (devices.textContent = plan.devices),
      (trail.textContent = plan.trail),
      (cancel.textContent = plan.cancel),
      (hdr.textContent = plan.hdr),
      (dolby.textContent = plan.dolby),
      (ad.textContent = plan.ad),
      (offline.textContent = plan.offline),
      (sharing.textContent = plan.sharing));
  }

  function getActivePlanName() {
    return document.querySelector(".is-active-sub")?.dataset.plan ?? "basic";
  }

  const subsciptionBtns =
    subscriptionInfo.querySelectorAll(".sub-swithcer-btn");

  subsciptionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      subsciptionBtns.forEach((b) => b.classList.remove("is-active-sub"));
      btn.classList.add("is-active-sub");

      const planName = btn.dataset.plan;
      updatePlanInfo(plans[planName]);

      const subPlans =
        subscriprionPage.querySelectorAll(".subscription-plans-info");
      subPlans.forEach((p) => {
        p.classList.remove("is-reveal");
        void p.offsetWidth;
        p.classList.add("is-reveal");
      });
    });
  });

  const subPlansDesc = document.createElement("section");
  subPlansDesc.className = "subscriptuion-plans-desc";
  subPlansDesc.innerHTML = `
    <table>
      <thead>
        <tr>
          <th scope='col'>Features</th>
          <th scope='col'>Basic</th>
          <th scope='col'>Standard</th>
          <th scope='col'>Premium</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Price</td>
          <td>${plans.basic.price}</td>
          <td>${plans.standart.price}</td>
          <td>${plans.standart.price}</td>
        </tr>
        <tr>
          <td>Content</td>
          <td>${plans.basic.content}</td>
          <td>${plans.standart.content}</td>
          <td>${plans.premium.content}</td>
        </tr>
        <tr>
          <td>Devices</td>
          <td>${plans.basic.devices}</td>
          <td>${plans.standart.devices}</td>
          <td>${plans.premium.devices}</td>
        </tr>
        <tr>
          <td>Free Trail</td>
          <td>${plans.basic.trail}</td>
          <td>${plans.standart.trail}</td>
          <td>${plans.premium.trail}</td>
        </tr>
        <tr>
          <td>Cancel Anytime</td>
          <td>${plans.basic.cancel}</td>
          <td>${plans.standart.cancel}</td>
          <td>${plans.premium.cancel}</td>
        </tr>
        <tr>
          <td>HDR</td>
          <td>${plans.basic.hdr}</td>
          <td>${plans.standart.hdr}</td>
          <td>${plans.premium.hdr}</td>
        </tr>
        <tr>
          <td>Dolby Atmos</td>
          <td>${plans.basic.dolby}</td>
          <td>${plans.standart.dolby}</td>
          <td>${plans.premium.dolby}</td>
        </tr>
        <tr>
          <td>Ad - Free</td>
          <td>${plans.basic.ad}</td>
          <td>${plans.standart.ad}</td>
          <td>${plans.premium.ad}</td>
        </tr>
        <tr>
          <td>Offline Viewing</td>
          <td>${plans.basic.offline}</td>
          <td>${plans.standart.offline}</td>
          <td>${plans.standart.offline}</td>
        </tr>
        <tr>
          <td>Family Sharing</td>
          <td>${plans.basic.sharing}</td>
          <td>${plans.standart.sharing}</td>
          <td>${plans.premium.sharing}</td>
        </tr>
      </tbody>
    </table>
  `;

  subscriprionPage.append(subscriptionSection);
  subscriprionPage.append(subscriptionInfo);
  subscriprionPage.append(subPlansInfo);
  subscriprionPage.append(subPlansDesc);

  return subscriprionPage;
}
