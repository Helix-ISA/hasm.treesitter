module.exports = grammar({
  name: 'hasm',

  // Spaces/tabs are insignificant.
  // Newlines are significant, so DON'T put \n here.
  extras: $ => [
    /[ \t\r]/,
    $.comment,
  ],

  rules: {
    // ============================================================
    // FILE
    // ============================================================

    source_file: $ => repeat(
      choice(
        $.statement,
        $.blank_line
      )
    ),

    // Every statement is explicitly terminated by a newline.
    statement: $ => seq(
      choice(
        $.label,
        $.instruction
      ),
      '\n'
    ),

    blank_line: $ => '\n',

    // ============================================================
    // LABEL
    // ============================================================

    label: $ => seq(
      field('name', $.identifier),
      ':'
    ),

    // ============================================================
    // INSTRUCTION
    // ============================================================

    instruction: $ => choice(
      $.two_operand_instruction,
      $.one_operand_instruction,
      $.zero_operand_instruction
    ),

    // ============================================================
    // TWO OPERAND INSTRUCTIONS
    // ============================================================

    two_operand_instruction: $ => seq(
      field('opcode', $.two_operand_opcode),

      optional(
        seq(
          '.',
          field('width', $.width)
        )
      ),

      field('operand1', $.operand),

      ',',

      field('operand2', $.operand)
    ),

    // ============================================================
    // ONE OPERAND INSTRUCTIONS
    // ============================================================

    one_operand_instruction: $ => seq(
      field('opcode', $.one_operand_opcode),

      optional(
        seq(
          '.',
          field('width', $.width)
        )
      ),

      field('operand1', $.operand)
    ),

    // ============================================================
    // ZERO OPERAND INSTRUCTIONS
    // ============================================================

    zero_operand_instruction: $ => seq(
      field('opcode', 'ret')
    ),

    // ============================================================
    // TWO OPERAND OPCODES
    // ============================================================

    two_operand_opcode: $ => token(
      choice(
        'mov',
        'ld',
        'st',
        'add',
        'sub',
        'and',
        'or',
        'xor'
      )
    ),

    // ============================================================
    // ONE OPERAND OPCODES
    // ============================================================

    one_operand_opcode: $ => token(
      choice(
        'not',
        'beq',
        'bne',
        'jmp',
        'call'
      )
    ),

    // ============================================================
    // WIDTH
    // ============================================================

    width: $ => choice(
      'b',
      'w',
      'd',
      'q'
    ),

    // ============================================================
    // OPERANDS
    // ============================================================

    operand: $ => choice(
      $.register,
      $.number,
      $.memory,
      $.identifier
    ),

    // ============================================================
    // REGISTER
    // ============================================================

    register: $ => token(
      /r([0-9]|[12][0-9]|3[01])/
    ),

    // ============================================================
    // NUMBER
    // ============================================================

    number: $ => token(
      choice(
        /[0-9]+/,
        /0[xX][0-9a-fA-F]+/,
        /0[bB][01]+/
      )
    ),

    // ============================================================
    // MEMORY
    // ============================================================

    memory: $ => seq(
      '[',

      field('base', $.register),

      optional(
        seq(
          field(
            'operator',
            choice('+', '-')
          ),

          field(
            'offset',
            choice(
              $.register,
              $.number
            )
          )
        )
      ),

      ']'
    ),

    // ============================================================
    // IDENTIFIER
    // ============================================================

    identifier: $ =>
      /[a-zA-Z_][a-zA-Z0-9_]*/,

    // ============================================================
    // COMMENT
    // ============================================================

    comment: $ => token(
      seq('#', /.*/)
    ),
  }
});

