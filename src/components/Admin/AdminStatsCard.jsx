const AdminStatsCard = ({
  label,
  value,
  icon: Icon,
  gradient,
}) => {
  return (
    <div
      className="
        group
        relative
        rounded-3xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* ======================================================
          GRADIENT GLOW BORDER
      ====================================================== */}

      <div
        className={`
          absolute
          inset-0
          rounded-3xl
          bg-gradient-to-br
          ${gradient}
          opacity-30
          blur-sm
          transition-all
          duration-300
          group-hover:opacity-70
        `}
      />

      {/* ======================================================
          CARD
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-slate-900/90
          p-5
          shadow-xl
          backdrop-blur-xl
          sm:p-6
        "
      >
        {/* ====================================================
            BACKGROUND GLOW
        ==================================================== */}

        <div
          className={`
            absolute
            -top-10
            right-0
            h-36
            w-36
            rounded-full
            bg-gradient-to-br
            ${gradient}
            opacity-0
            blur-3xl
            transition-all
            duration-500
            group-hover:opacity-30
          `}
        />

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            relative
            flex
            items-start
            justify-between
            gap-4
          "
        >
          {/* VALUE */}

          <div className="min-w-0">
            <p
              className="
                mb-2
                truncate
                text-sm
                font-medium
                text-slate-400
                sm:mb-3
              "
            >
              {label}
            </p>

            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
                text-white
                transition-transform
                duration-300
                origin-left
                group-hover:scale-105
                sm:text-4xl
              "
            >
              {value}
            </h2>
          </div>

          {/* ICON */}

          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              ${gradient}
              text-xl
              text-white
              shadow-lg
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:rotate-6
              sm:h-14
              sm:w-14
              sm:text-2xl
            `}
          >
            {Icon && <Icon />}
          </div>
        </div>

        {/* ====================================================
            BOTTOM PROGRESS GLOW
        ==================================================== */}

        <div
          className="
            mt-5
            h-1
            overflow-hidden
            rounded-full
            bg-white/10
            sm:mt-6
          "
        >
          <div
            className={`
              h-full
              w-2/3
              rounded-full
              bg-gradient-to-r
              ${gradient}
              transition-all
              duration-500
              group-hover:w-full
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsCard;