module.exports = grammar({
  name: 'hasm',

  extras: $ => [
    /[ \t\r]/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat(
      choice(
        $.statement,
        $.blank_line
      )
    ),

    statement: $ => seq(
      choice(
        $.label,
        $.instruction
      ),
      '\n'
    ),

    blank_line: $ => '\n',

    label: $ => seq(
      field('name', $.identifier),
      ':'
    ),

    instruction: $ => choice(
      $.r_type_format,
      $.i_type_format,
      $.s_type_format,
      $.b_type_format,
      $.j_type_format
    ),

    r_type_format: $ => seq(
      field('mnemonic', $.r_type_mnemonic),
      field('rd', $.register),
      ',',
      field('rs1', $.register),
      field('rs1', $.register)
    ),

    r_type_mnemonic: $ => token(choice(
      'add',
      'sub',
      'and',
      'or',
      'xor',
      'sll',
      'slr',
      'sar',
      'slt',
      'sltu'
    )),

    i_type_format: $ => choice(
      seq(
        field('mnemonic', $.i_format_mnemonic),
        field('rd', $.register),
        ',',
        field('rs1', $.register),
        ',',
        field('immediate', $.number)
      ),

      seq(
        field('mnemonic', $.i_format_mnemonic),
        field('rd', $.register),
        ',',
        field('memory', $.memory)
      ),
    ),

    i_format_mnemonic: $ => token(choice(
      'addi',
      'andi',
      'ori',
      'xori',
      'slli',
      'slri',
      'sari',
      'slti',
      'sltui',

      'lb',
      'lq',
      'lh',
      'lw',
      'lbu',
      'lqu',
      'lhu',

      'jral'
    )),

    j_type_format: $ => seq(
      field('mnemonic', $.j_type_mnemonic),
      field('rd', $.register),
      ',',
      field('symbol', $.identifier)
    ),

    j_type_mnemonic: $ => token(
      'jal'
    ),

    s_type_format: $ => seq(
      field('mnemonic', $.s_type_mnemonic),
      field('memory', $.memory),
      ',',
      field('rs2', $.register)
    ),

    s_type_mnemonic: $ => token(choice(
      'sb',
      'sq',
      'sh',
      'sw',
    )),

    memory: $ => seq(
      '[',
      field('base', $.register),
      optional(
        seq(
          field('operator', choice('+', '-')),
          field('offset', choice(
            $.number
          ))
        )
      ),
      ']'
    ),

    b_type_format: $ => seq(
      field('mnemonic', $.b_type_mnemonic),
      field('rs1', $.register),
      ',',
      field('rs2', $.register),
      ',',
      field('symbol', $.identifier)
    ),

    b_type_mnemonic: $ => token(choice(
      'beq',
      'bne',
      'blt',
      'bge',
    )),

    register: $ => token(
      /h([0-9]|[12][0-9]|3[01])/
    ),

    number: $ => token(
      seq(
        optional('-'),
        choice(
          /[0-9]+/,
          /0[xX][0-9a-fA-F]+/,
          /0[bB][01]+/
        )
      )
    ),

    identifier: $ =>
      token(
        /[a-zA-Z_][a-zA-Z0-9_]*/
      ),

    comment: $ => token(
      seq(
        '#',
        /[^\n]*/
      )
    ),
  },
});

